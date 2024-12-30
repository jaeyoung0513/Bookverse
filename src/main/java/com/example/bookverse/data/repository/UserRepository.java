package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = "select * from user where email=:email", nativeQuery = true)
    UserEntity findByEmail(@Param("email") String email);
}
