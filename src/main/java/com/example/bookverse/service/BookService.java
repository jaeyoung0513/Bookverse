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
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;

    public List<BookDTO> getAllBook() {
        return bookRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookDTO addBook(BookDTO bookDTO) {
        if (bookRepository.existsByTitleAndAuthorAndPublisher(
                bookDTO.getTitle(), bookDTO.getAuthor(), bookDTO.getPublisher())) {
            throw new EntityExistsException("같은 도서가 이미 존재합니다. 다시 한번 확인해주세요.");
        }

        BookEntity book = convertToEntity(bookDTO);
        book.setCreatedAt(LocalDateTime.now());
        BookEntity savedBook = bookRepository.save(book);

        return convertToDTO(savedBook);
    }

    public List<BookDTO> searchBooks(String query) {
        if (query == null || query.isBlank()) {
            throw new IllegalArgumentException("검색어를 입력해주세요.");
        }
        return bookRepository.findBooksByQuery(query)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        BookEntity book = existsByBookId(id);

        // DTO => 엔티티 업데이트
        book.setTitle(bookDTO.getTitle() != null ? bookDTO.getTitle() : book.getTitle());
        book.setDesc(bookDTO.getDesc() != null ? bookDTO.getDesc() : book.getDesc());
        book.setAuthor(bookDTO.getAuthor() != null ? bookDTO.getAuthor() : book.getAuthor());
        book.setPublisher(bookDTO.getPublisher() != null ? bookDTO.getPublisher() : book.getPublisher());
        book.setCategory(bookDTO.getCategory() != null ? bookDTO.getCategory() : book.getCategory());
        book.setQuantity(bookDTO.getQuantity() != null ? bookDTO.getQuantity() : book.getQuantity());
        book.setPrice(bookDTO.getPrice() != null ? bookDTO.getPrice() : book.getPrice());
        book.setImage(bookDTO.getImage() != null ? bookDTO.getImage() : book.getImage());
        book.setUpdatedAt(LocalDateTime.now());

        BookEntity updatedBook = bookRepository.save(book);
        return convertToDTO(updatedBook);
    }

    private BookEntity existsByBookId(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("해당 도서를 찾을 수 없습니다."));
    }

    // BookEntity -> BookDTO 변환 메서드
    private BookDTO convertToDTO(BookEntity bookEntity) {
        return BookDTO.builder()
                .id(bookEntity.getId())
                .title(bookEntity.getTitle())
                .desc(bookEntity.getDesc())
                .author(bookEntity.getAuthor())
                .publisher(bookEntity.getPublisher())
                .category(bookEntity.getCategory())
                .quantity(bookEntity.getQuantity())
                .price(bookEntity.getPrice())
                .image(bookEntity.getImage())
                .build();
    }

    // BookDTO -> BookEntity 변환 메서드
    private BookEntity convertToEntity(BookDTO bookDTO) {
        return BookEntity.builder()
                .title(bookDTO.getTitle())
                .desc(bookDTO.getDesc())
                .author(bookDTO.getAuthor())
                .publisher(bookDTO.getPublisher())
                .category(bookDTO.getCategory())
                .quantity(bookDTO.getQuantity())
                .price(bookDTO.getPrice())
                .image(bookDTO.getImage())
                .build();
    }
}
