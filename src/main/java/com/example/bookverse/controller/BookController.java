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

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/book")
public class BookController {
    private final BookRepository bookRepository;
    private final BookService bookService;

    @GetMapping(value = "/booklist")
    public ResponseEntity<List<BookEntity>> booklist() {
        List<BookEntity> bookEntityList = this.bookRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(bookEntityList);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody BookDTO bookDTO) {
        BookEntity addedBook = bookService.addBook(bookDTO);
        return ResponseEntity.ok(addedBook);

    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam(required = false, defaultValue = "") String query) {
        List<BookEntity> books = bookService.searchBooks(query);
        return ResponseEntity.ok(books);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<BookEntity> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        BookEntity updatedBook = bookService.updateBook(id, bookDTO);
        return ResponseEntity.ok(updatedBook);
    }
}
