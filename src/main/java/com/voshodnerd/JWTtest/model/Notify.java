package com.voshodnerd.JWTtest.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.voshodnerd.JWTtest.payload.UserSummary;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notifylist")
public class Notify {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private  String name;
    private  String cnt;
    private Date dtsend;
    @JsonInclude()
    @Transient
    List<UserSummary> list;

}
