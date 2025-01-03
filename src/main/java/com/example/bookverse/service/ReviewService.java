package com.example.bookverse.service;


import com.example.bookverse.data.dto.ReviewDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.entity.ReviewEntity;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.BookRepository;
import com.example.bookverse.data.repository.PurchaseRepository;
import com.example.bookverse.data.repository.ReviewRepository;
import com.example.bookverse.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final PurchaseRepository purchaseRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public List<ReviewEntity> getReviewsByBook(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }

    // 리뷰 작성
    public ReviewEntity addReview(ReviewDTO reviewDTO) {
        UserEntity user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        BookEntity book = bookRepository.findById(reviewDTO.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 책입니다."));

        ReviewEntity review = ReviewEntity.builder()
                .user(user)
                .book(book)
                .content(reviewDTO.getContent())
                .build();

        return reviewRepository.save(review);
    }


    // 회원별 리뷰 조회 (관리자)
    public List<ReviewEntity> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }
    // 리뷰 수정
    public ReviewEntity editReview(Long reviewId, Long userId, String content) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰를 찾을 수 없습니다."));
        if (!review.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }
        review.setContent(content);
        return reviewRepository.save(review);
    }

    // 리뷰 삭제
    public void deleteReview(Long reviewId, Long userId) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰를 찾을 수 없습니다."));
        if (!review.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }
        reviewRepository.delete(review);
    }
}
