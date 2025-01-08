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
import java.util.Random;
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
            roleEntity.setUser(userEntity);
            if (user.getEmail().equals("admin@gmail.com")) {
                roleEntity.setRoleName("ROLE_ADMIN");
            } else {
                roleEntity.setRoleName("ROLE_USER");
            }
            roleRepository.save(roleEntity);

            return userEntity;
        }
        return null;
    }

    public UserDTO userInfo(String email) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("회원이 아닙니다.");
        }
        return convertToDTO(user);
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
        String id = userRepository.findEmailByNameBirthdatePhone(
                user.getName(),
                user.getBirthdate(),
                user.getPhone()
        );
        if (id == null) {
            throw new EntityNotFoundException("일치하는 회원이 없습니다. 다시 입력해주세요.");
        }
        return id;
    }


    public String findPw(UserDTO user) {
        // 사용자 정보로 회원 검색
        UserEntity userEntity = userRepository.findUserEntityByEmailNameBirthdatePhone(
                user.getEmail(), user.getName(), user.getBirthdate(), user.getPhone()
        );
        if (userEntity == null) {
            throw new EntityNotFoundException("일치하는 회원이 없습니다. 다시 입력해주세요.");
        }

        // 4자리 임시 비밀번호 생성
        String newPw = createNewPw(4);

        // 비밀번호 암호화 후 저장
        String encodedPw = passwordEncoder.encode(newPw);
        userEntity.setPw(encodedPw);
        userEntity.setUpdatedAt(LocalDateTime.now());
        userRepository.save(userEntity); // 변경사항 저장

        // 생성된 비밀번호 반환
        return newPw;
    }

    private String createNewPw(int length) {
        StringBuilder password = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            password.append(random.nextInt(10)); // 0~9 사이의 랜덤 숫자 추가
        }
        return password.toString();
    }


    public UserDTO updateUser(Long id, UserDTO userDTO) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        if (userDTO.getPw() != null) {
            user.setPw(passwordEncoder.encode(userDTO.getPw()));
        }
        if (userDTO.getName() != null) {
            user.setName(userDTO.getName());
        }
        if (userDTO.getAddr() != null) {
            user.setAddr(userDTO.getAddr());
        }
        if (userDTO.getPhone() != null) {
            user.setPhone(userDTO.getPhone());
        }
        user.setUpdatedAt(LocalDateTime.now());

        UserEntity updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void setDormantStatus(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        user.setDormant(true);
        userRepository.save(user);
    }

    public void restoreActiveStatus(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        user.setDormant(false);
        userRepository.save(user);
    }

    public List<UserDTO> filterUsersByStatus(String status) {
        List<UserEntity> users;
        if ("active".equalsIgnoreCase(status)) {
            users = userRepository.findActiveUsers();
        } else if ("dormant".equalsIgnoreCase(status)) {
            users = userRepository.findDormantUsers();
        } else {
            users = userRepository.findAll();
        }
        return users.stream()
                .map(this::convertToDTO) // UserEntity -> UserDTO 변환
                .collect(Collectors.toList());
    }

    // 변환 메서드
    private UserDTO convertToDTO(UserEntity userEntity) {
        return UserDTO.builder()
                .user_id(userEntity.getId())
                .email(userEntity.getEmail())
                .name(userEntity.getName())
                .birthdate(userEntity.getBirthdate())
                .addr(userEntity.getAddr())
                .phone(userEntity.getPhone())
                .status(userEntity.isDormant())
                .build();
    }
}
