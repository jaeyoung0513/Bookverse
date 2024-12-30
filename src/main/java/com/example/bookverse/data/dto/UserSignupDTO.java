package com.example.bookverse.data.dto;

import lombok.Data;

@Data
public class UserSignupDTO  {

        private String email;
        private String pw;
        private String addr;
        private String name;
        private String phone;
        private Long birthdate;

}

