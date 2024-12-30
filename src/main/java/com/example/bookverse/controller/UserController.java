package com.example.bookverse.controller;

import com.example.bookverse.data.dto.UserDTO;
import com.example.bookverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/join")
    public ResponseEntity<String> join(@RequestBody UserDTO user) {
        if(this.userService.saveUser(user)!=null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User joined");
        };
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not joined");
    }
}
