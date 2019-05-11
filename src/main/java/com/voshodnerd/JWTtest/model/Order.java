package com.voshodnerd.JWTtest.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;



@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@Table(name = "orders")
public class Order {
  @Id
  @NonNull
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;
  String number;
  Long totalprice;
  Date dtorder;
  Boolean ready;
  @JoinColumn(name = "iduser", referencedColumnName = "id")
  @ManyToOne
  User iduser;
  @JoinColumn(name = "idstaff", referencedColumnName = "id")
  @ManyToOne
  Staff idstaff;

}
