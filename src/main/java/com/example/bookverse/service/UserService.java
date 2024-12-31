package com.example.bookverse.service;

import com.example.bookverse.data.dto.UserDTO;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private EntityManager entityManager;

    public UserEntity saveUser(UserDTO user) {
        if (this.userRepository.findByEmail(user.getEmail()) == null) {
            UserEntity userEntity = new UserEntity().builder()
                    .email(user.getEmail())
                    .pw(this.passwordEncoder.encode(user.getPw()))
                    .name(user.getName())
                    .birthdate(user.getBirthdate())
                    .addr(user.getAddr())
                    .phone(user.getPhone())
                    .createdAt(LocalDateTime.now())
                    .build();
            this.userRepository.save(userEntity);
            return userEntity;
        }
        return null;
    }

    public String findId(UserDTO user) {
        String id = userRepository.findIdByEmail(user.getName(), user.getBirthdate(), user.getPhone());
        if (id == null) {
            throw new EntityNotFoundException("일치하는 회원이 없습니다. 다시 입력해주세요.");
        }
        return id;
    }
    
    public String findPw(UserDTO user) {
        UserEntity userEntity = userRepository.findUserEntityByEmailNameBirthdatePhone(user.getEmail(), user.getName(), user.getBirthdate(), user.getPhone());
        if (userEntity == null) {
            throw new EntityNotFoundException("일치하는 회원이 없습니다. 다시 입력해주세요.");
        }

        String newPw = createNewPw(10);
        String encodePw = passwordEncoder.encode(newPw);
        userEntity.setPw(encodePw);
        userEntity.setUpdatedAt(LocalDateTime.now());
        userRepository.save(userEntity);

        return newPw;
    }

    public String createNewPw(int len) {
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        SecureRandom rm = new SecureRandom();
        StringBuffer sb = new StringBuffer();

        for(int i=0; i<len; i++) {
            int index = rm.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }


}
