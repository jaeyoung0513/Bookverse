package com.example.bookverse.controller;

import com.example.bookverse.data.dto.PurchaseDTO;
import com.example.bookverse.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {
    private final PurchaseService purchaseService;

    @GetMapping("/purchaseList")
    public ResponseEntity<List<PurchaseDTO>> getPurchasesByUser(@RequestParam String email) {
        try {
            List<PurchaseDTO> purchases = purchaseService.getPurchasesByUser(email);
            return ResponseEntity.ok(purchases);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/membersPurchaseList")
    public ResponseEntity<List<PurchaseDTO>> getAllPurchases() {
        try {
            List<PurchaseDTO> purchases = purchaseService.getAllPurchases();
            return ResponseEntity.ok(purchases);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
