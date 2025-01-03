package com.example.bookverse.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDTO {
    private String email;
    private String pw;
    private String name;
    private String birthdate;
    private String addr;
    private String phone;
}
