package com.example.bookverse.service;

import com.example.bookverse.data.dto.ReviewDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.entity.ReviewEntity;
import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.BookRepository;
import com.example.bookverse.data.repository.ReviewRepository;
import com.example.bookverse.data.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public ReviewDTO addReview(ReviewDTO reviewDTO) {
        UserEntity user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 사용자입니다."));
        BookEntity book = bookRepository.findById(reviewDTO.getBookId())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 책입니다."));

        ReviewEntity review = ReviewEntity.builder()
                .user(user)
                .book(book)
                .content(reviewDTO.getContent())
                .build();

        ReviewEntity savedReview = reviewRepository.save(review);
        return convertToDTO(savedReview);
    }

    public List<ReviewDTO> getReviewsByBook(Long bookId) {
        return reviewRepository.findByBookId(bookId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReviewDTO editReview(Long reviewId, ReviewDTO reviewDTO) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("리뷰를 찾을 수 없습니다."));
        if (!review.getUser().getId().equals(reviewDTO.getUserId())) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }
        review.setContent(reviewDTO.getContent());
        ReviewEntity updatedReview = reviewRepository.save(review);
        return convertToDTO(updatedReview);
    }

    public void deleteReview(Long reviewId, Long userId) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("리뷰를 찾을 수 없습니다."));
        if (!review.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }
        reviewRepository.delete(review);
    }

    private ReviewDTO convertToDTO(ReviewEntity reviewEntity) {
        return new ReviewDTO(
                reviewEntity.getId(),
                reviewEntity.getUser().getId(),
                reviewEntity.getBook().getId(),
                reviewEntity.getContent()
        );
    }

    private ReviewEntity convertToEntity(ReviewDTO reviewDTO, UserEntity user, BookEntity book) {
        return ReviewEntity.builder()
                .user(user)
                .book(book)
                .content(reviewDTO.getContent())
                .build();
    }
}
