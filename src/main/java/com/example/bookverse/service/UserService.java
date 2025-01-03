package com.example.bookverse.service;

import com.example.bookverse.data.dto.UserDTO;
import com.example.bookverse.data.entity.RoleEntity;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.RoleRepository;
import com.example.bookverse.data.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

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

            RoleEntity roleEntity = new RoleEntity();
            RoleEntity roleEntity2 = new RoleEntity();
            roleEntity.setUser(userEntity);
            if (user.getEmail().equals("admin@bookverse.com")) {
                roleEntity.setRoleName("ROLE_ADMIN");
                roleEntity2.setUser(userEntity);
                roleEntity2.setRoleName("ROLE_USER");
                roleRepository.save(roleEntity2);
            } else {
                roleEntity.setRoleName("ROLE_USER");
            }
            roleRepository.save(roleEntity);

            return userEntity;
        }
        return null;
    }

    public void checkId(String email) {
        if (userRepository.findByEmail(email) != null) {
            throw new EntityExistsException("이미 있는 아이디입니다. 다시 입력해주세요.");
        }
    }

    @Transactional
    public void cancelUser(String email) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("일치하는 회원이 없습니다.");
        } else {
            roleRepository.deleteByUserId(user.getId());
            userRepository.deleteById(user.getId());
        }
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

        for (int i = 0; i < len; i++) {
            int index = rm.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

    public UserEntity updateUser(Long id, UserDTO userDTO) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 유저를 찾을 수 없습니다."));

        user.setPw(userDTO.getPw() != null ? this.passwordEncoder.encode(userDTO.getPw()) : user.getPw());
        user.setName(userDTO.getName() != null ? userDTO.getName() : user.getName());
        user.setBirthdate(userDTO.getBirthdate() != null ? userDTO.getBirthdate() : user.getBirthdate());
        user.setAddr(userDTO.getAddr() != null ? userDTO.getAddr() : user.getAddr());
        user.setPhone(userDTO.getPhone() != null ? userDTO.getPhone() : user.getPhone());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public List<UserDTO> getAllUser() {
        return userRepository.findAll().stream()
                .map(user -> UserDTO.builder()
                        .email(user.getEmail())
                        .name(user.getName())
                        .birthdate(user.getBirthdate())
                        .addr(user.getAddr())
                        .phone(user.getPhone())
                        .build())
                .collect(Collectors.toList());
    }

    public void setDormantStatus(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("해당 사용자는 존재하지 않습니다."));
        userRepository.updateUserStatus(userId, true);
    }

    public void restoreActiveStatus(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("해당 사용자는 존재하지 않습니다."));
        userRepository.updateUserStatus(userId, false);
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserEntity> getActiveUsers() {
        return userRepository.findActiveUsers();
    }

    public List<UserEntity> getDormantUsers() {
        return userRepository.findDormantUsers();
    }
}
