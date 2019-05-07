package com.voshodnerd.JWTtest.payload;


import com.voshodnerd.JWTtest.model.Role;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@ToString
public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private String adress;
    private String email;
    private List<String> roles = new ArrayList<>();

    public UserSummary(Long id, String username, String name,String address,String email,List<String> roles) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.roles=roles;
        this.adress=address;
        this.email=email;
    }


}
