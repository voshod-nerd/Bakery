package com.voshodnerd.JWTtest.model;

public enum  RoleName {
    ROLE_USER,
    ROLE_ADMIN,
    ROLE_DRIVER;

    public static RoleName getEnumByName(String value) {
        if (value.equals("ROLE_USER")) return RoleName.ROLE_USER;
        if (value.equals("ROLE_ADMIN")) return RoleName.ROLE_ADMIN;
        if (value.equals("ROLE_DRIVER")) return RoleName.ROLE_DRIVER;
        return  RoleName.ROLE_USER;
    }
}
