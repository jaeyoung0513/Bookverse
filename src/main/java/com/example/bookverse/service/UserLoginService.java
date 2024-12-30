package com.example.bookverse.service;

import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserLoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean login(String email, String rawPassword) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // 비밀번호 검증
        return passwordEncoder.matches(rawPassword, user.getPw());
    }
}
