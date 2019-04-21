package com.voshodnerd.JWTtest.repository;

import com.voshodnerd.JWTtest.model.ContentOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentOrdersRepository extends JpaRepository<ContentOrders,Long> {
    @Query(value ="SELECT * FROM contentorder  WHERE idorder = ?1",nativeQuery = true)
    Optional<List<ContentOrders>> findAllByIdorder(Long orderId);
}
