package com.example.bookverse.data.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String pw;
}
