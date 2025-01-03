package com.example.bookverse.controller;

import com.example.bookverse.data.dto.UserDTO;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.service.UserService;
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
        if(this.userService.saveUser(user)!=null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입하였습니다.");
        };
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 있는 아이디입니다. 다시 입력해주세요.");
    }

    @GetMapping(value = "/find/id")
    public ResponseEntity<String> findId(@RequestBody UserDTO user) {
        String id = userService.findId(user);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }

    @GetMapping(value = "/find/pw")
    public ResponseEntity<String> findPw(@RequestBody UserDTO user) {
        String newPw = userService.findPw(user);
        return ResponseEntity.status(HttpStatus.OK).body(newPw);
    }
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<UserEntity> update(@PathVariable Long id, @RequestBody UserDTO user) {
        UserEntity updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping(value = "/userlist")
    public ResponseEntity<List<UserDTO>> getAllUser() {
        List<UserDTO> user = userService.getAllUser();
        return ResponseEntity.ok(user);
    }

    //휴면 관련 기능

    @PutMapping(value = "/{userId}/setDormant")
    public ResponseEntity<?> setDormantStatus(@PathVariable Long userId) {
        userService.setDormantStatus(userId);
        return ResponseEntity.ok("회원이 휴면 상태로 전환되었습니다.");
    }

    @PutMapping(value = "/{UserId}/setActive")
    public ResponseEntity<?> restoreActiveStatus(@PathVariable Long UserId) {
        userService.restoreActiveStatus(UserId);
        return ResponseEntity.ok("회원이 활성 상태로 전환되었습니다.");
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterUsers(@RequestParam(required = false) String status) {
        List<UserEntity> users;

        if ("active".equalsIgnoreCase(status)) {
            users = userService.getActiveUsers();
        } else if ("dormant".equalsIgnoreCase(status)) {
            users = userService.getDormantUsers();
        } else {
            users = userService.getAllUsers();
        }
        return ResponseEntity.ok(users);
    }
}
