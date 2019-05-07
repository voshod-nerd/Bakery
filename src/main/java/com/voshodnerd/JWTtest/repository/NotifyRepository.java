package com.voshodnerd.JWTtest.repository;


import com.voshodnerd.JWTtest.model.Notify;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NotifyRepository extends JpaRepository<Notify,Long> {
    Optional<Notify> findById(Notify goods);
}
