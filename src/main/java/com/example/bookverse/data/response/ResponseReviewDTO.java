package com.example.bookverse.data.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ResponseReviewDTO {
    private Long reviewId;
    private String name;
    private Long bookId;
    private String content;
}