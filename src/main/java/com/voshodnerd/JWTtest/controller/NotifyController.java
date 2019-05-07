package com.voshodnerd.JWTtest.controller;



import com.voshodnerd.JWTtest.model.Notify;
import com.voshodnerd.JWTtest.payload.ApiResponse;
import com.voshodnerd.JWTtest.payload.UserSummary;
import com.voshodnerd.JWTtest.repository.NotifyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

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
            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {

                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
                    messageHelper.setTo(summary.getEmail());
                    messageHelper.setSubject(notify.getName());
                    messageHelper.setText(notify.getCnt(),true);
                    mailSender.send(message);
                } catch (MessagingException e) {
                    e.printStackTrace();
                }

            });
            try {
            future.get(); } catch (InterruptedException er1 ) {
                er1.printStackTrace();
            }
            catch ( ExecutionException er2) {
                er2.printStackTrace();
            }
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
