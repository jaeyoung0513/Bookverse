package com.example.bookverse.data.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ResponseDTO {
    private Long bookId;
    private Long total_quantity;
    private String category;

    public ResponseDTO(Object[] values) {
        this.bookId = ((Number) values[0]).longValue();
        this.total_quantity = ((Number) values[1]).longValue();
        this.category = (String) values[2];
    }
}