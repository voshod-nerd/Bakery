package com.voshodnerd.JWTtest.repository;

import com.voshodnerd.JWTtest.model.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GoodsRepository extends JpaRepository<Goods,Long> {
    Optional<Goods> findById(Goods goods);
}


