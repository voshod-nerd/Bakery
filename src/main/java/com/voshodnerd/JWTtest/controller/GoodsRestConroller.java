package com.voshodnerd.JWTtest.controller;


import com.voshodnerd.JWTtest.model.Goods;
import com.voshodnerd.JWTtest.payload.ApiResponse;
import com.voshodnerd.JWTtest.repository.GoodsRepository;
import com.voshodnerd.JWTtest.security.CurrentUser;
import com.voshodnerd.JWTtest.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goods")
public class GoodsRestConroller {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    GoodsRepository goodsRepository;


    @PostMapping("/addgoods")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?>  createNewGoods(@Valid @RequestBody Goods goods) {
        System.out.println(goods);
        Goods newGood = goodsRepository.save(goods);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{goodsId}")
                .buildAndExpand(newGood.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Goods Created Successfully"));
    }


    @GetMapping("/{goodsId}")
    @PreAuthorize("hasRole('any')")
    public Goods getGoodsById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long goodsId) {
        return goodsRepository.findById(goodsId).get();
    }

    @RequestMapping(value="/all",method = RequestMethod.GET)
    public List<Goods> getAllGoods() {
        return goodsRepository.findAll();
    }

    @PutMapping("/update")
    public ResponseEntity<Goods> updateStudent(@Valid @RequestBody Goods goods) {
        //log.info("Request to update group: {}", group);
        Goods result = goodsRepository.save(goods);
        return ResponseEntity.ok().body(result);


    }







}
