package com.voshodnerd.JWTtest.controller;


import com.voshodnerd.JWTtest.model.ContentOrders;
import com.voshodnerd.JWTtest.model.Goods;
import com.voshodnerd.JWTtest.model.Order;
import com.voshodnerd.JWTtest.model.User;
import com.voshodnerd.JWTtest.payload.ApiResponse;
import com.voshodnerd.JWTtest.payload.ListGoods;
import com.voshodnerd.JWTtest.payload.OrderItem;
import com.voshodnerd.JWTtest.repository.ContentOrdersRepository;
import com.voshodnerd.JWTtest.repository.GoodsRepository;
import com.voshodnerd.JWTtest.repository.OrderRepository;
import com.voshodnerd.JWTtest.repository.UserRepository;
import com.voshodnerd.JWTtest.security.CurrentUser;
import com.voshodnerd.JWTtest.security.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.xml.crypto.Data;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@Slf4j
public class OrderRestController {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    GoodsRepository goodsRepository;
    @Autowired
    ContentOrdersRepository contentOrdersRepository;
    @Autowired
    UserRepository userRepository;


    @PostMapping("/addorder")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createNewOrder(@Valid @RequestBody OrderItem orderItem,@CurrentUser UserPrincipal currentUser) {
        System.out.println(orderItem);

        User user = userRepository.findById(currentUser.getId()).get();

        Order order = new Order();
        order.setIduser(user);
        order.setDtorder(orderItem.getDtorder());
        order.setNumber(orderItem.getNumber());
        order.setTotalprice(orderItem.getTotalprice());
        order.setReady(false);
        final Order neworder= orderRepository.save(order);

        orderItem.getListGoods().forEach((x)-> {
            Optional<Goods> goods= goodsRepository.findById(x.getId());
            ContentOrders contentOrders = new ContentOrders();
            contentOrders.setIdgoods(goods.get());
            contentOrders.setCount(x.getCount());
            contentOrders.setIdorder(neworder);
            contentOrdersRepository.save(contentOrders);
        });


        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{orderId}")
                .buildAndExpand(neworder.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Goods Created Successfully"));
    }


    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('any')")
    public Order getGoodsById(@CurrentUser UserPrincipal currentUser,
                              @PathVariable Long orderId) {
        return orderRepository.findById(orderId).get();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/all",method = RequestMethod.GET)
    public List<OrderItem> getAllOrder() {

        Optional<List<Order>> result=  orderRepository.findAllOrders();
        List<Order> lstOrder= result.isPresent()?result.get(): new ArrayList<>();
        final List<OrderItem>  ls = new ArrayList<>();

        lstOrder.forEach((value) -> {
            OrderItem item =new OrderItem();
            item.setId(value.getId());
            item.setDtorder(value.getDtorder());
            item.setNumber(value.getNumber());
            item.setIduser(value.getIduser());
            item.setReady(value.getReady());
            item.setTotalprice(value.getTotalprice());
            List<ContentOrders> co= contentOrdersRepository.findAllByIdorder(value.getId()).get();
            List<ListGoods> lsGoods= new ArrayList<>();
            for (ContentOrders v: co) {
                ListGoods goods = new ListGoods();
                goods.setId(v.getIdgoods().getId());
                goods.setActual(v.getIdgoods().getActual());
                goods.setName(v.getIdgoods().getName());
                goods.setPrice(v.getIdgoods().getPrice());
                goods.setWeight(v.getIdgoods().getWeight());
                goods.setCount(v.getCount());
                goods.toString();
                lsGoods.add(goods);
            }
            item.setListGoods(lsGoods);
            ls.add(item);


        } );
        return ls;
    }


    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value="/allbyuser",method = RequestMethod.GET)
    public List<OrderItem> getAllOrderByUser(@CurrentUser UserPrincipal currentUser) {
        System.out.println("Username");
        System.out.println(currentUser.getUsername());
        Optional<List<Order>> result= orderRepository.findByAllByUserId(currentUser.getId());
        List<Order> lstOrder= result.isPresent()?result.get(): new ArrayList<>();
        final List<OrderItem>  ls = new ArrayList<>();

        lstOrder.forEach((value) -> {
            OrderItem item =new OrderItem();
            item.setId(value.getId());
            item.setDtorder(value.getDtorder());
            item.setNumber(value.getNumber());
            item.setIduser(value.getIduser());
            item.setReady(value.getReady());
            item.setTotalprice(value.getTotalprice());
            List<ContentOrders> co= contentOrdersRepository.findAllByIdorder(value.getId()).get();
            List<ListGoods> lsGoods= new ArrayList<>();
            for (ContentOrders v: co) {
                ListGoods goods = new ListGoods();
                goods.setId(v.getIdgoods().getId());
                goods.setActual(v.getIdgoods().getActual());
                goods.setName(v.getIdgoods().getName());
                goods.setPrice(v.getIdgoods().getPrice());
                goods.setWeight(v.getIdgoods().getWeight());
                goods.setCount(v.getCount());
                goods.toString();
                lsGoods.add(goods);
            }
            item.setListGoods(lsGoods);
            ls.add(item);


        } );
        return ls;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by_date/{strDate}")
    public List<OrderItem> getAllOrderByDate(@PathVariable String strDate)  {

        System.out.println("This is by date"+strDate);

        Date date=new Date();
        try
        { date=new SimpleDateFormat("yyyy-MM-dd").parse(strDate); }
        catch (ParseException exception) {
            System.out.println(exception.getMessage());
        }
        System.out.println("By date");


        Optional<List<Order>> result =  orderRepository.findByAllByDtorder(date);
        List<Order> lstOrder= result.isPresent()?result.get(): new ArrayList<Order>();


        final List<OrderItem>  ls = new ArrayList<>();

        lstOrder.forEach((value) -> {
            OrderItem item =new OrderItem();
            item.setId(value.getId());
            item.setIdstaff(value.getIdstaff());
            item.setDtorder(value.getDtorder());
            item.setNumber(value.getNumber());
            item.setIduser(value.getIduser());
            item.setReady(value.getReady());
            item.setTotalprice(value.getTotalprice());

            //List<ContentOrders> co= contentOrdersRepository.findAllByIdorder(value.getId()).get();
            Optional<List<ContentOrders>> res= contentOrdersRepository.findAllByIdorder(value.getId());
            List<ContentOrders> co= res.isPresent() ? res.get(): new ArrayList<ContentOrders>();

            List<ListGoods> lsGoods= new ArrayList<>();
            for (ContentOrders v: co) {
                ListGoods goods = new ListGoods();
                goods.setId(v.getIdgoods().getId());
                goods.setActual(v.getIdgoods().getActual());
                goods.setName(v.getIdgoods().getName());
                goods.setPrice(v.getIdgoods().getPrice());
                goods.setWeight(v.getIdgoods().getWeight());
                goods.setCount(v.getCount());
                goods.toString();
                lsGoods.add(goods);
            }
            item.setListGoods(lsGoods);
            ls.add(item);
        } );
        return ls;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pure_by_date/{strDate}")
    public List<Order> getAllPureOrderByDate(@PathVariable String strDate)  {

        Date date=new Date();
        try
        { date=new SimpleDateFormat("yyyy-MM-dd").parse(strDate); }
        catch (ParseException exception) {
            System.out.println(exception.getMessage());
        }
        System.out.println("By date");


        Optional<List<Order>> result =  orderRepository.findByAllByDtorder(date);

        return result.get();
    }


    @PutMapping("/update")
    public ResponseEntity<OrderItem> updateOrderItem(@Valid @RequestBody OrderItem orderItem) {
        log.info("Request to update order idStaff:",orderItem );
        Order order= orderRepository.findById(orderItem.getId()).get();
        order.setIdstaff(orderItem.getIdstaff());
        order.setReady(orderItem.getReady());
        Order newOrder = orderRepository.save(order);
        return ResponseEntity.ok().body(orderItem);
    }


    @PreAuthorize("hasRole('DRIVER')")
    @GetMapping("/by_date_and_idstaff/{dt}")
    public List<OrderItem> getOrderByDateForDriver(@CurrentUser UserPrincipal currentUser,@PathVariable String dt)  {

        Date date=new Date();
        try
        { date=new SimpleDateFormat("yyyy-MM-dd").parse(dt); }
        catch (ParseException exception) {
            System.out.println(exception.getMessage());
        }
        System.out.println("By date");


        System.out.println("idUser="+currentUser.getId()+" dt="+date.toString());
        Optional<List<Order>> result =  orderRepository.findByDtorderAndIdstaff(currentUser.getId(),date);
      //  System.out.println(result.get().size());
        List<Order> lstOrder= result.isPresent()?result.get(): new ArrayList<Order>();
        final List<OrderItem>  ls = new ArrayList<>();
        lstOrder.forEach((value) -> {
            OrderItem item =new OrderItem();
            item.setId(value.getId());
            item.setIdstaff(value.getIdstaff());
            item.setDtorder(value.getDtorder());
            item.setNumber(value.getNumber());
            item.setIduser(value.getIduser());
            item.setTotalprice(value.getTotalprice());
            item.setReady(value.getReady());

            Optional<List<ContentOrders>> res= contentOrdersRepository.findAllByIdorder(value.getId());
            List<ContentOrders> co= res.isPresent() ? res.get(): new ArrayList<ContentOrders>();

            List<ListGoods> lsGoods= new ArrayList<>();
            for (ContentOrders v: co) {
                ListGoods goods = new ListGoods();
                goods.setId(v.getIdgoods().getId());
                goods.setActual(v.getIdgoods().getActual());
                goods.setName(v.getIdgoods().getName());
                goods.setPrice(v.getIdgoods().getPrice());
                goods.setWeight(v.getIdgoods().getWeight());
                goods.setCount(v.getCount());
                goods.toString();
                lsGoods.add(goods);
            }
            item.setListGoods(lsGoods);
            ls.add(item);
        } );

        return ls;
    }





}
