package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.PurchaseEntity;
import com.example.bookverse.response.Top5BooksResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Long> {
    @Query(value = "SELECT p.book_id AS bookId, sum(p.quantity) AS total_quantity, b.category AS category FROM purchase p JOIN book b ON p.book_id=b.book_id GROUP BY p.book_id ORDER BY total_quantity DESC LIMIT 5", nativeQuery = true)
    List<Top5BooksResponse> findTop5Books();

    List<PurchaseEntity> findByUserId(Long userId);

    @Query(value = "SELECT p.book_id, sum(p.quantity) AS total_quantity, b.category FROM purchase p JOIN book b ON p.book_id=b.book_id GROUP BY p.book_id HAVING category=:category ORDER BY total_quantity DESC LIMIT 5", nativeQuery = true)
    List<Top5BooksResponse> findTop5BooksByCategory(@Param("category") String category);
}
