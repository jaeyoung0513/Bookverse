package com.example.bookverse.service;

import com.example.bookverse.data.dto.UserSignupDTO;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserSignUpService  {

    private final UserRepository userRepository;

    public UserSignUpService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void signup(UserSignupDTO request) {
        UserEntity user = UserEntity.builder()
                .email(request.getEmail())
                .pw(request.getPw()) // 비밀번호 암호화 필요 시 추가
                .addr(request.getAddr())
                .name(request.getName())
                .phone(request.getPhone())
                .birthdate(request.getBirthdate())
                .build();

        userRepository.save(user);
    }
}

