package com.example.bookverse.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PurchaseDTO {

    private String bookTitle;
    private Integer quantity;
    private Integer price;
    private LocalDateTime orderDate;
}
