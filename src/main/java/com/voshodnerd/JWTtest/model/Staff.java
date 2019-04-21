package com.voshodnerd.JWTtest.model;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;

@Data
@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String fio;
    String  phone;
    String place;
    String adress;
    
}
