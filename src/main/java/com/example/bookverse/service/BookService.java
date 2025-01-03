package com.example.bookverse.service;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.repository.BookRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookEntity existsByBookId(Long bookId) {
        BookEntity book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("해당 도서를 찾을 수 없습니다."));
        return book;
    }

    public BookEntity addBook(BookDTO bookDTO) {
        bookRepository.findByTitleAndAuthorAndPublisher(
                bookDTO.getTitle(),
                bookDTO.getAuthor(),
                bookDTO.getPublisher()
        );

        if (bookRepository.existsByTitleAndAuthorAndPublisher(
                bookDTO.getTitle(), bookDTO.getAuthor(), bookDTO.getPublisher())) {
            throw new EntityExistsException("같은 도서가 이미 존재합니다. 다시 한번 확인해주세요.");
        }

        BookEntity book = BookEntity.builder()
                .title(bookDTO.getTitle())
                .desc(bookDTO.getDesc())
                .author(bookDTO.getAuthor())
                .publisher(bookDTO.getPublisher())
                .category(bookDTO.getCategory())
                .quantity(bookDTO.getQuantity())
                .price(bookDTO.getPrice())
                .image(bookDTO.getImage())
                .createdAt(LocalDateTime.now())
                .build();

        return bookRepository.save(book);
    }

    public List<BookEntity> searchBooks(String query) {
        if (query == null || query.isBlank()) {
            throw new IllegalArgumentException("검색어를 입력해주세요.");
        }

        return bookRepository.findBooksByQuery(query);
    }

    public BookEntity updateBook(Long id, BookDTO bookDTO) {
        BookEntity book = existsByBookId(id);

        BookEntity updatedBook = BookEntity.builder()
                .id(book.getId())
                .title(bookDTO.getTitle() != null ? bookDTO.getTitle() : book.getTitle())
                .desc(bookDTO.getDesc() != null ? bookDTO.getDesc() : book.getDesc())
                .author(bookDTO.getAuthor() != null ? bookDTO.getAuthor() : book.getAuthor())
                .publisher(bookDTO.getPublisher() != null ? bookDTO.getPublisher() : book.getPublisher())
                .category(bookDTO.getCategory() != null ? bookDTO.getCategory() : book.getCategory())
                .quantity(bookDTO.getQuantity() != null ? bookDTO.getQuantity() : book.getQuantity())
                .price(bookDTO.getPrice() != null ? bookDTO.getPrice() : book.getPrice())
                .image(bookDTO.getImage() != null ? bookDTO.getImage() : book.getImage())
                .createdAt(book.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .build();

        return bookRepository.save(updatedBook);
    }
}
