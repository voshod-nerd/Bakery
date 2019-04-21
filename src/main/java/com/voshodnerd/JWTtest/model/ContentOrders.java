package com.voshodnerd.JWTtest.model;

import lombok.*;

import javax.persistence.*;

@Data
@Table(name = "contentorder")
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@Entity
public class ContentOrders {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @JoinColumn(name = "idgoods", referencedColumnName = "id")
    @ManyToOne
    Goods idgoods;
    @JoinColumn(name = "idorder", referencedColumnName = "id")
    @ManyToOne
    Order idorder;
    Long count;

}
