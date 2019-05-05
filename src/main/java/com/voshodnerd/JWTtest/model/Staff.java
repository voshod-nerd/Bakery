package com.voshodnerd.JWTtest.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "staff")
@NoArgsConstructor
@RequiredArgsConstructor
public class Staff {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String fio;
    String  phone;
    String place;
    String adress;
    Boolean work;
    
}
