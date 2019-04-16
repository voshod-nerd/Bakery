package com.voshodnerd.JWTtest.payload;


import com.voshodnerd.JWTtest.model.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private List<String> roles = new ArrayList<>();

    public UserSummary(Long id, String username, String name,List<String> roles) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.roles=roles;
    }


}
