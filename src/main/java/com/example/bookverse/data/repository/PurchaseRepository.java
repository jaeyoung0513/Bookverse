package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.PurchaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Long> {
    @Query(value = "select * from purchase where user_id=:user_id and book_id=:bookId", nativeQuery = true)
    PurchaseEntity findByUserIdAndBookId(@Param("user_id") Long userId, @Param("bookId") Long bookId);

}
