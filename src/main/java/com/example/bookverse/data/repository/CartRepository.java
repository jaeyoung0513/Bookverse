package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.CartEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CartRepository extends CrudRepository<CartEntity, Long> {
    @Query(value = "select * from cart where user_id=:user_id and book_id=:bookId", nativeQuery = true)
    CartEntity findByUserIdAndBookId(@Param("user_id") Long userId, @Param("bookId") Long bookId);
}
