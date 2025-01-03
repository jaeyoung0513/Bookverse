package com.example.bookverse.controller;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.request.RequestDTO;
import com.example.bookverse.data.request.RequestListDTO;
import com.example.bookverse.response.Top5BooksResponse;
import com.example.bookverse.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/book")
public class PurchaseController {
    private final PurchaseService purchaseService;

    @PostMapping(value = "/add/wish")
    public ResponseEntity<String> addWish(@RequestBody RequestDTO requestDTO) {
        purchaseService.addWish(requestDTO.getEmail(), requestDTO.getBookId());
        return ResponseEntity.status(HttpStatus.CREATED).body("찜목록에 추가되었습니다.");
    }

    @DeleteMapping(value = "/delete/wish")
    public ResponseEntity<String> deleteWish(@RequestBody RequestDTO requestDTO) {
        purchaseService.deleteWish(requestDTO.getEmail(), requestDTO.getBookId());
        return ResponseEntity.status(HttpStatus.OK).body("찜목록에서 제거되었습니다.");
    }

    @PostMapping(value = "/add/cart")
    public ResponseEntity<String> addCart(@RequestBody RequestDTO requestDTO) {
        purchaseService.addCart(requestDTO.getEmail(), requestDTO.getBookId(), requestDTO.getQuantity());
        return ResponseEntity.status(HttpStatus.CREATED).body("장바구니에 추가되었습니다.");
    }

    @DeleteMapping(value = "/delete/cart")
    public ResponseEntity<String> deleteCart(@RequestBody RequestDTO requestDTO) {
        purchaseService.deleteCart(requestDTO.getEmail(), requestDTO.getBookId());
        return ResponseEntity.status(HttpStatus.OK).body("장바구니에서 제거되었습니다.");
    }

    @PostMapping(value = "/buy")
    public ResponseEntity<String> buyBook(@RequestBody RequestListDTO requestListDTO) {
        purchaseService.buyBook(requestListDTO.getEmail(), requestListDTO.getRequestBuyDTOS());
        return ResponseEntity.status(HttpStatus.OK).body("구매되었습니다.");
    }

    @GetMapping(value = "/top/all")
    public ResponseEntity<List<BookDTO>> findTop5Books() {
        List<BookDTO> bookDTOS = purchaseService.findTop5Books();
        return ResponseEntity.status(HttpStatus.OK).body(bookDTOS);
    }

    @GetMapping(value = "/top/category")
    public ResponseEntity<List<BookDTO>> findTop5BooksByCategory(@RequestParam String category) {
        List<BookDTO> bookDTOS = purchaseService.findTop5BooksByCategory(category);
        return ResponseEntity.status(HttpStatus.OK).body(bookDTOS);
    }
}
