package com.example.bookverse.service;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.entity.BookEntity;
import com.example.bookverse.data.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@RequiredArgsConstructor
@Service
public class BookService {
    private BookRepository bookRepository;

    public BookEntity addBook(BookDTO bookDTO) {

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
