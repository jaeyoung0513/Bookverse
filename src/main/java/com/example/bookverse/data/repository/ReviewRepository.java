package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findByUserId(Long userId);
    List<ReviewEntity> findByBookId(Long bookId);
}
