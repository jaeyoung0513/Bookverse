package com.example.bookverse.controller;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.repository.BookRepository;
import com.example.bookverse.data.request.RequestDTO;
import com.example.bookverse.data.request.RequestListDTO;
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

    @PostMapping(value = "/add/wish")
    public ResponseEntity<String> addWish(@RequestBody RequestDTO requestDTO) {
        bookService.addWish(requestDTO.getEmail(), requestDTO.getBookId());
        return ResponseEntity.status(HttpStatus.CREATED).body("찜목록에 추가되었습니다.");
    }

    @DeleteMapping(value = "/delete/wish")
    public ResponseEntity<String> deleteWish(@RequestBody RequestDTO requestDTO) {
        bookService.deleteWish(requestDTO.getEmail(), requestDTO.getBookId());
        return ResponseEntity.status(HttpStatus.OK).body("찜목록에서 제거되었습니다.");
    }

    @PostMapping(value = "/add/cart")
    public ResponseEntity<String> addCart(@RequestBody RequestDTO requestDTO) {
        bookService.addCart(requestDTO.getEmail(), requestDTO.getBookId(), requestDTO.getQuantity());
        return ResponseEntity.status(HttpStatus.CREATED).body("장바구니에 추가되었습니다.");
    }

    @DeleteMapping(value = "/delete/cart")
    public ResponseEntity<String> deleteCart(@RequestBody RequestDTO requestDTO) {
        bookService.deleteCart(requestDTO.getEmail(), requestDTO.getBookId());
        return ResponseEntity.status(HttpStatus.OK).body("장바구니에서 제거되었습니다.");
    }

    @PostMapping(value = "/buy")
    public ResponseEntity<String> buyBook(@RequestBody RequestListDTO requestListDTO) {
        bookService.buyBook(requestListDTO.getEmail(), requestListDTO.getRequestBuyDTOS());
        return ResponseEntity.status(HttpStatus.OK).body("구매되었습니다.");
    }
}
