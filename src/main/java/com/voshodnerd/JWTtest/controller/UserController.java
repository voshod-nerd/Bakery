


package com.voshodnerd.JWTtest.controller;


import com.voshodnerd.JWTtest.model.Role;
import com.voshodnerd.JWTtest.model.RoleName;
import com.voshodnerd.JWTtest.model.User;
import com.voshodnerd.JWTtest.payload.UserIdentityAvailability;

import com.voshodnerd.JWTtest.payload.UserSummary;
import com.voshodnerd.JWTtest.repository.RoleRepository;
import com.voshodnerd.JWTtest.repository.UserRepository;
import com.voshodnerd.JWTtest.security.CurrentUser;
import com.voshodnerd.JWTtest.security.UserPrincipal;


import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/user/pureall")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getPureUserList() {
       // List<User> result = userRepository.findAllByRoleName("ROLE_USER").get();
        List<User> result = userRepository.findAll();
        return  result;
    }



    @GetMapping("/user/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserSummary> getCurrentUser() {
        List<User> lst = userRepository.findAll();
        final List<UserSummary> result= new ArrayList<>();

         lst.stream().forEach(value -> {

            List<String> roles= new  ArrayList(value.getRoles().stream().map(v-> v.getName().name()).collect(Collectors.toList()));
            UserSummary usr= new UserSummary(value.getId(),value.getUsername(),value.getName(),value.getAdress(),value.getEmail(),roles);
            result.add(usr);

        });


        return result;
    }


    @PutMapping("/user/update")
    public ResponseEntity<UserSummary> updateStudent(@Valid @RequestBody UserSummary usr) {
         System.out.println("User/update");
        usr.toString();
        User user= userRepository.findById(usr.getId()).get();
        RoleName roleName = RoleName.getEnumByName(usr.getRoles().get(0));

        Role role = roleRepository.findByName(roleName).get();
        user.getRoles().clear();
        user.getRoles().add(role);
        User newUser= userRepository.save(user);

        newUser.toString();
        return ResponseEntity.ok().body(usr);

    }



    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('DRIVER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {


       List<String> roles= currentUser.getAuthorities().stream().map(x->((GrantedAuthority) x).getAuthority() ).collect(Collectors.toList());
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(),currentUser.getAdress(),currentUser.getEmail(),roles);
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

