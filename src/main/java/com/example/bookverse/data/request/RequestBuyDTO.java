package com.example.bookverse.data.request;

import lombok.Data;

@Data
public class RequestBuyDTO {
    private String email;
    private Long bookId;
    private Integer quantity;
    private Integer price;
}
