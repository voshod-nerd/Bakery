package com.voshodnerd.JWTtest.controller;



import com.voshodnerd.JWTtest.model.Notify;
import com.voshodnerd.JWTtest.payload.ApiResponse;
import com.voshodnerd.JWTtest.payload.UserSummary;
import com.voshodnerd.JWTtest.repository.NotifyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/notify")
public class NotifyController {

    @Autowired
    NotifyRepository notifyRepository;
    @Autowired
    JavaMailSender mailSender;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createNewNotify(@Valid @RequestBody Notify notify) {
        System.out.println(notify);
        Notify newNotify = notifyRepository.save(notify);

        for (UserSummary summary:notify.getList()) {
            System.out.println("Отправляю письма");
            CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(summary.getAdress());
                message.setSubject(notify.getName());

                mailSender.send(message);
                return  "Message Sent";
            });
        }


        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(newNotify.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Notify Created Successfully"));
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('any')")
    public Notify getNotifyById(@PathVariable Long id) {
        return notifyRepository.findById(id).get();
    }

    @RequestMapping(value="/all",method = RequestMethod.GET)
    public List<Notify> getAllNotify() {
        return notifyRepository.findAll();
    }

}
