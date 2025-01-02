package com.example.bookverse.service;

import com.example.bookverse.data.dto.PurchaseDTO;
import com.example.bookverse.data.entity.PurchaseEntity;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.PurchaseRepository;
import com.example.bookverse.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;



    // 특정 사용자의 구매 기록 조회

    public List<PurchaseDTO> getPurchasesByUser(String email) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("해당 이메일의 사용자를 찾을 수 없습니다.");
        }

        List<PurchaseEntity> purchases = purchaseRepository.findByUserId(user.getId());
        return purchases.stream()
                .map(purchase -> PurchaseDTO.builder()
                        .bookTitle(purchase.getBook().getTitle())
                        .quantity(purchase.getQuantity())
                        .price(purchase.getPrice())
                        .orderDate(purchase.getOrderDate())
                        .build()
                )
                .collect(Collectors.toList());
    }

        // 모든 구매 기록 조회 (관리자 용)

    public List<PurchaseDTO> getAllPurchases() {
        List<PurchaseEntity> purchases = purchaseRepository.findAll();
        return purchases.stream()
                .map(purchase -> PurchaseDTO.builder()
                        .bookTitle(purchase.getBook().getTitle())
                        .quantity(purchase.getQuantity())
                        .price(purchase.getPrice())
                        .orderDate(purchase.getOrderDate())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
