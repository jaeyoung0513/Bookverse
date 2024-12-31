package com.example.bookverse.service;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookEntity addBook(BookDTO bookDTO) {
        // 도서 체크
        Optional<BookEntity> existingBook = bookRepository.findByTitleAndAuthorAndPublisher(
                bookDTO.getTitle(),
                bookDTO.getAuthor(),
                bookDTO.getPublisher()
        );


        if (bookRepository.existsByTitleAndAuthorAndPublisher(
                bookDTO.getTitle(), bookDTO.getAuthor(), bookDTO.getPublisher())) {
            throw new IllegalArgumentException("같은 도서가 이미 존재합니다. 다시 한번 확인해주세요.");
        }


        // 도서 등록
        BookEntity book = BookEntity.builder()
                .title(bookDTO.getTitle())
                .desc(bookDTO.getDesc())
                .author(bookDTO.getAuthor())
                .publisher(bookDTO.getPublisher())
                .category(bookDTO.getCategory())
                .quantity(bookDTO.getQuantity() != null ? bookDTO.getQuantity() : 10) // Default 값
                .price(bookDTO.getPrice())
                .image(bookDTO.getImage())
                .createdAt(LocalDateTime.now())
                .build();

        return bookRepository.save(book);
    }

}
