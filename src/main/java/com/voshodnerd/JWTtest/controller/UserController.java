


package com.voshodnerd.JWTtest.controller;


import com.voshodnerd.JWTtest.payload.UserIdentityAvailability;

import com.voshodnerd.JWTtest.payload.UserSummary;
import com.voshodnerd.JWTtest.repository.UserRepository;
import com.voshodnerd.JWTtest.security.CurrentUser;
import com.voshodnerd.JWTtest.security.UserPrincipal;


import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;



    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('DRIVER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {


       List<String> roles= currentUser.getAuthorities().stream().map(x->((GrantedAuthority) x).getAuthority() ).collect(Collectors.toList());
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(),currentUser.getAdress(),roles);
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }




}

