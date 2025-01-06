package com.example.bookverse.controller;

import com.example.bookverse.data.dto.BookDTO;
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
    private final BookService bookService;

    @GetMapping(value = "/booklist")
    public ResponseEntity<List<BookDTO>> booklist() {
        List<BookDTO> bookDTOList = bookService.getAllBook();
        return ResponseEntity.status(HttpStatus.OK).body(bookDTOList);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<BookDTO> addBook(@RequestBody BookDTO bookDTO) {
        BookDTO addedBook = bookService.addBook(bookDTO);
        return ResponseEntity.ok(addedBook);
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<BookDTO>> searchBooks(@RequestParam(required = false, defaultValue = "") String query) {
        List<BookDTO> books = bookService.searchBooks(query);
        return ResponseEntity.ok(books);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        BookDTO updatedBook = bookService.updateBook(id, bookDTO);
        return ResponseEntity.ok(updatedBook);
    }
}
