package com.example.bookverse.service;

import com.example.bookverse.data.repository.BookRepository;
import com.example.bookverse.data.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private BookRepository bookRepository;
    private CartRepository cartRepository;

    public void buyBook(String email, List<String> bookId){
        // 만드는 중
    }
}
