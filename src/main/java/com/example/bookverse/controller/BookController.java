package com.example.bookverse.controller;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.repository.BookRepository;
import com.example.bookverse.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/book")
public class BookController {
    private final BookRepository bookRepository;
    private final BookService bookService;

    @GetMapping(value = "/booklist")
    public ResponseEntity<List<BookEntity>> booklist() {
        List<BookEntity> bookEntityEntityList = this.bookRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(bookEntityEntityList);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody BookDTO bookDTO) {
        try {
            BookEntity addedBook = bookService.addBook(bookDTO);
            return ResponseEntity.ok(addedBook);
        } catch (IllegalArgumentException e) {
            // 중복 도서 처리, 에러 메시지 출력
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(
            @RequestParam(required = false, defaultValue = "") String title,
            @RequestParam(required = false, defaultValue = "") String author) {
        try {
            List<BookEntity> books = bookService.searchBooks(title, author);
            return ResponseEntity.ok(books);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); // 에러 메시지 반환
        }
    }

}
