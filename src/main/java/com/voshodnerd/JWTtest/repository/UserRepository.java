
package com.voshodnerd.JWTtest.repository;

import com.voshodnerd.JWTtest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);

    Optional<User> findByUsername(String username);


    @Query(value ="SELECT * FROM users u WHERE id in (SELECT user_id FROM   diplom.user_roles WHERE role_id IN ( \n" +
            "SELECT id FROM diplom.roles r WHERE r.name=?1))",nativeQuery = true)
    Optional<List<User>> findAllByRoleName(String role);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
