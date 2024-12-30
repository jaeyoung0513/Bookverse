package com.example.bookverse.controller;

import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/book")
public class BookController {
    private final BookRepository bookRepository;

    @GetMapping(value = "/booklist")
    public ResponseEntity<List<BookEntity>> booklist() {
        List<BookEntity> bookEntityEntityList = this.bookRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(bookEntityEntityList);
    }
}
