package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.WishlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<WishlistEntity, Long> {
}
