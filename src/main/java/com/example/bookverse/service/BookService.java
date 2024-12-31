package com.example.bookverse.service;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.repository.BookRepository;
import com.example.bookverse.data.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;
    private final CartRepository cartRepository;

    public void buyBook(String email, List<String> bookId) {
        // 만드는 중
    }

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
                .quantity(bookDTO.getQuantity())
                .price(bookDTO.getPrice())
                .image(bookDTO.getImage())
                .createdAt(LocalDateTime.now())
                .build();

        return bookRepository.save(book);
    }


    public List<BookEntity> searchBooks(String title, String author) {
        if (title.isBlank() && author.isBlank()) {
            throw new IllegalArgumentException("검색 조건을 입력해주세요."); // 검색 조건이 없을 때 예외 처리
        }

        List<BookEntity> books = bookRepository.findBooksByTitleAndAuthor(title, author);

        if (books.isEmpty()) {
            throw new IllegalArgumentException("검색 결과가 없습니다. 다시 한번 확인해주세요."); // 검색 결과가 없을 때 예외 처리
        }

        return books;
    }

    public BookEntity updateBook(Long id, BookDTO bookDTO) {
        BookEntity book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 도서를 찾을 수 없습니다."));

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
