package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookEntity, Long> {
}
