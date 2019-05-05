package com.voshodnerd.JWTtest.controller;


import com.voshodnerd.JWTtest.model.Goods;
import com.voshodnerd.JWTtest.model.Staff;
import com.voshodnerd.JWTtest.payload.ApiResponse;
import com.voshodnerd.JWTtest.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffRestController {
    @Autowired
    StaffRepository staffRepository;


    @PostMapping("/addstaff")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createNewGoods(@Valid @RequestBody Staff staff) {
        System.out.println(staff);
        Staff newStaff = staffRepository.save(staff);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{staffId}")
                .buildAndExpand(newStaff.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Staff Created Successfully"));
    }


    @GetMapping("/{staffId}")
    @PreAuthorize("hasRole('any')")
    public Staff getGoodsById(@PathVariable Long goodsId) {
        return staffRepository.findById(goodsId).get();
    }

    @RequestMapping(value="/all",method = RequestMethod.GET)
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @PutMapping("/update")
    public ResponseEntity<Staff> updateStaff(@Valid @RequestBody Staff goods) {
        //log.info("Request to update group: {}", group);
        Staff result = staffRepository.save(goods);
        return ResponseEntity.ok().body(result);


    }


}
