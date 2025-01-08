package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.WishlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<WishlistEntity, Long> {
	@Query("SELECT w FROM WishlistEntity w WHERE w.user.email = :email")
	List<WishlistEntity> findByUserEmail(String email);
	
	@Query("SELECT w FROM WishlistEntity w WHERE w.user.email = :email AND w.book.id = :bookId")
	Optional<WishlistEntity> findByUserEmailAndBookId(String email, Long bookId);
}

