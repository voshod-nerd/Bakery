package com.voshodnerd.JWTtest.model;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;


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
  /*@OneToMany(
          cascade = CascadeType.ALL,
          orphanRemoval = true
  )
  @JoinColumn(name = "idorder")
  List<ContentOrders> listContentOrder;

   */
}
