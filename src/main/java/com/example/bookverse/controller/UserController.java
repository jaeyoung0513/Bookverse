package com.example.bookverse.controller;


import com.example.bookverse.data.dto.UserSignupDTO;
import com.example.bookverse.service.UserSignUpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserSignUpService userSignUpService;

        @PostMapping("/join")
        public ResponseEntity<String> signup(@RequestBody UserSignupDTO request) {
//            try {
//                String message = userSignUpService.signup(request);
//                return ResponseEntity.ok(message);
//            } catch (IllegalArgumentException e) {
//                return ResponseEntity.badRequest().body(e.getMessage());
//            }
            userSignUpService.signup(request);
            return ResponseEntity.ok("Signup successful");
        }

    }