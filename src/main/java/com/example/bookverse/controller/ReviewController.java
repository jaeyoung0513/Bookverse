package com.example.bookverse.controller;

import com.example.bookverse.data.dto.ReviewDTO;
import com.example.bookverse.data.entity.ReviewEntity;
import com.example.bookverse.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value ="/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    // 리뷰 작성
    @PostMapping(value ="/add")
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO reviewDTO) {
        ReviewEntity savedReview = reviewService.addReview(reviewDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    // 책별 리뷰 조회
    @GetMapping(value ="/book/{bookId}")
    public ResponseEntity<List<ReviewDTO>> getBookReviews(@PathVariable Long bookId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByBook(bookId)
                .stream()
                .map(review -> new ReviewDTO(
                        review.getId(),
                        review.getUser().getId(),
                        review.getBook().getId(),
                        review.getContent()))
                .toList();
        return ResponseEntity.ok(reviews);
    }

    // 회원별 리뷰 조회 (관리자)
    @GetMapping(value ="/user/{userId}")
    public ResponseEntity<?> getUserReviews(@PathVariable Long userId) {
        List<ReviewEntity> reviews = reviewService.getReviewsByUser(userId);
        return ResponseEntity.ok(reviews);
    }

    // 리뷰 수정
    @PutMapping(value ="/edit/{id}")
    public ResponseEntity<ReviewEntity> editReview(@RequestBody ReviewDTO reviewDTO) {
        return ResponseEntity.ok(reviewService.editReview(reviewDTO.getId(), reviewDTO.getUserId(), reviewDTO.getContent()));
    }

    @DeleteMapping(value ="/delete")
    public ResponseEntity<Void> deleteReview(@RequestBody ReviewDTO reviewDTO) {
        reviewService.deleteReview(reviewDTO.getId(), reviewDTO.getUserId());
        return ResponseEntity.ok().build();
    }
}
