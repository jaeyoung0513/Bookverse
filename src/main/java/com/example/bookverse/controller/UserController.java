package com.example.bookverse.controller;

import com.example.bookverse.data.dto.UserDTO;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        userService.checkId(email);
        return ResponseEntity.status(HttpStatus.OK).body("가입가능한 아이디입니다.");
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
}
