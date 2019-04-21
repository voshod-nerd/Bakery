package com.voshodnerd.JWTtest.payload;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ListGoods {
    private Long id;
    String name;
    Integer price;
    Integer weight;
    String description;
    Boolean actual;
    Long count;
}
