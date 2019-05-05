package com.voshodnerd.JWTtest.repository;

import com.voshodnerd.JWTtest.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff,Long> {
}
