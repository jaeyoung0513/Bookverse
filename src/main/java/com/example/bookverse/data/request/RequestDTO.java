package com.example.bookverse.data.request;

import lombok.Data;

@Data
public class RequestDTO {
    private String email;
    private Long bookId;
    private Integer quantity;
}
