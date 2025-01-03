package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    @Query(value = "select r.role_name from role r join user u on r.user_id = u.user_id where u.email = :email", nativeQuery = true)
    List<String> findRolesByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query(value = "delete from role where user_id=:userId", nativeQuery = true)
    void deleteByUserId(@Param("userId") Long userId);
}
