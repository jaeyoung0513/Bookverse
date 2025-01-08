package com.example.bookverse.controller;

import com.example.bookverse.data.dto.UserDTO;
import com.example.bookverse.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/join")
    public ResponseEntity<String> join(@RequestBody UserDTO user) {
        if (this.userService.saveUser(user) != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입하였습니다.");
        }
        ;
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 있는 아이디입니다. 다시 입력해주세요.");
    }
    
    @GetMapping(value = "/check/id")
    public ResponseEntity<String> checkId(@RequestParam String email) {
        this.userService.checkId(email);
        return ResponseEntity.status(HttpStatus.OK).body("가입가능한 아이디 입니다");
    }
    
    
    @DeleteMapping(value = "/cancel")
    public ResponseEntity<String> cancel(@RequestParam String email) {
        userService.cancelUser(email);
        return ResponseEntity.status(HttpStatus.OK).body("회원탈퇴되었습니다.");
    }

    @GetMapping(value = "/userinfo")
    public ResponseEntity<UserDTO> userInfo(@RequestParam String email) {
        UserDTO user = userService.userInfo(email);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
    
    @PostMapping(value = "/find/id")
    public ResponseEntity<String> findId(@RequestBody UserDTO user) {
        try {
            String id = userService.findId(user);
            return ResponseEntity.ok(id); // 200 OK로 이메일 반환
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다."); // 500 Internal Server Error
        }
    }
    
    @PostMapping(value = "/find/pw")
    public ResponseEntity<String> findPw(@RequestBody UserDTO user) {
        try {
            String newPassword = userService.findPw(user); // 서비스 호출
            return ResponseEntity.status(HttpStatus.OK).body(newPassword); // 평문으로 반환
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("일치하는 회원이 없습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 찾기 중 오류가 발생했습니다.");
        }
    }
    
    
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping(value = "/userlist")
    public ResponseEntity<List<UserDTO>> getAllUser() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 휴면 관련 기능
    @PutMapping(value = "/{userId}/setDormant")
    public ResponseEntity<String> setDormantStatus(@PathVariable Long userId) {
        userService.setDormantStatus(userId);
        return ResponseEntity.ok("회원이 휴면 상태로 전환되었습니다.");
    }

    @PutMapping(value = "/{userId}/setActive")
    public ResponseEntity<String> restoreActiveStatus(@PathVariable Long userId) {
        userService.restoreActiveStatus(userId);
        return ResponseEntity.ok("회원이 활성 상태로 전환되었습니다.");
    }

    @GetMapping(value = "/filter")
    public ResponseEntity<List<UserDTO>> filterUsers(@RequestParam(required = false) String status) {
        List<UserDTO> users = userService.filterUsersByStatus(status);
        return ResponseEntity.ok(users);
    }
}
