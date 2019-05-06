package com.voshodnerd.JWTtest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.voshodnerd.JWTtest.utils.NumericBooleanDeserializer;
import com.voshodnerd.JWTtest.utils.NumericBooleanSerializer;
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
    @JsonProperty
    @JsonSerialize(using= NumericBooleanSerializer.class)
    @JsonDeserialize(using= NumericBooleanDeserializer.class)
    Boolean work;
    
}
