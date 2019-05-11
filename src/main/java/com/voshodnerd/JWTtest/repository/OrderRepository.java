package com.voshodnerd.JWTtest.repository;

import com.voshodnerd.JWTtest.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository  extends JpaRepository<Order, Long> {
    Optional<Order> findById(Order order);
    @Query(value ="SELECT * FROM orders  WHERE iduser = ?1",nativeQuery = true)
    Optional<List<Order>> findByAllByUserId(Long order);

    @Query(value ="SELECT * FROM orders  WHERE dtorder = ?1",nativeQuery = true)
    Optional<List<Order>> findByAllByDtorder(Date dtorder);




    @Query(value ="select * from orders WHERE idstaff in (\n" +
            "  select id from staff WHERE iduser=?1) and dtorder=?2",nativeQuery = true)
    Optional<List<Order>> findByDtorderAndIdstaff(Long iduser,Date dt);
}



