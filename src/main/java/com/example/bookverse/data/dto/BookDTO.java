package com.example.bookverse.data.dto;


import lombok.Data;

@Data
public class BookDTO {
    private String title;
    private String desc;
    private String author;
    private String publisher;
    private String category;
    private Integer quantity;
    private Integer price;
    private String image;
}
