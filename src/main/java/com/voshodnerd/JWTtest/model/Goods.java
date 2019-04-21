package com.voshodnerd.JWTtest.model;



import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@ToString
@Table(name = "goods")
public class Goods {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String name;
    Integer price;
    Integer weight;
    String description;
    Boolean actual;
    /*@OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "idgoods")
    List<ContentOrders> listContentOrder;
    */
}
