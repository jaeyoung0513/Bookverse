package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.ReviewEntity;
import com.example.bookverse.data.response.ResponseReviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findByUserId(Long userId);

    List<ReviewEntity> findByBookId(Long bookId);

    @Query(value = "SELECT r.r_id, u.name, r.book_id, r.content FROM review r JOIN user u ON r.user_id=u.user_id WHERE r.book_id=:bookId", nativeQuery = true)
    List<ResponseReviewDTO> findAllReviewsByBookId(@Param("bookId") Long bookId);
}
