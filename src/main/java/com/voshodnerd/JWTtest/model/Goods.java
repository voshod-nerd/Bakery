package com.voshodnerd.JWTtest.model;



import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
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

}
