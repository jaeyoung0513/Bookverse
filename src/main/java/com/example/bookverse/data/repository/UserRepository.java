package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = "select * from user where email=:email", nativeQuery = true)
    UserEntity findByEmail(@Param("email") String email);

    @Query(value ="select email from user where name=:name and birthdate=:birthdate and phone=:phone", nativeQuery = true)
    String findIdByEmail(@Param("name") String name, @Param("birthdate") String birthdate, @Param("phone") String phone);

    @Query(value ="select * from user where email=:email and name=:name and birthdate=:birthdate and phone=:phone", nativeQuery = true)
    UserEntity findUserEntityByEmailNameBirthdatePhone(@Param("email") String email, @Param("name") String name, @Param("birthdate") String birthdate, @Param("phone") String phone);

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.isActive = :isActive WHERE u.id = :userId")
    void updateUserStatus(@Param("userId") Long userId, @Param("isActive") boolean isActive);

    @Query("SELECT u FROM UserEntity u WHERE u.isActive = true")
    List<UserEntity> findActiveUsers();

    @Query("SELECT u FROM UserEntity u WHERE u.isActive = false")
    List<UserEntity> findDormantUsers();

}
