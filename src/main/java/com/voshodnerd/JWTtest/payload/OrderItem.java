package com.voshodnerd.JWTtest.payload;

import com.voshodnerd.JWTtest.model.Staff;
import com.voshodnerd.JWTtest.model.User;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Data
@ToString
public class OrderItem {
    Long id;
    String number;
    Long totalprice;
    Date dtorder;
    User iduser;
    Boolean ready;
    List<ListGoods> listGoods;
    Staff idstaff;

}
