package com.example.bookverse.controller;

import com.example.bookverse.data.dto.ReviewDTO;
import com.example.bookverse.data.response.ResponseReviewDTO;
import com.example.bookverse.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping(value = "/add")
    public ResponseEntity<ResponseReviewDTO> addReview(@RequestBody ReviewDTO reviewDTO) {
        ResponseReviewDTO savedReview = reviewService.addReview(reviewDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    @GetMapping(value = "/book/{bookId}")
    public ResponseEntity<List<ResponseReviewDTO>> getBookReviews(@PathVariable Long bookId) {
        List<ResponseReviewDTO> reviews = reviewService.getReviewsByBook(bookId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getUserReviews(@PathVariable Long userId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUser(userId);
        return ResponseEntity.ok(reviews);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<ReviewDTO> editReview(@PathVariable Long id, @RequestBody ReviewDTO reviewDTO) {
        ReviewDTO updatedReview = reviewService.editReview(id, reviewDTO);
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id, @RequestParam Long userId) {
        reviewService.deleteReview(id, userId);
        return ResponseEntity.ok().build();
    }
}
