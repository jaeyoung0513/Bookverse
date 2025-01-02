package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.PurchaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Long> {
    List<PurchaseEntity> findByUserId(Long userId);
}
