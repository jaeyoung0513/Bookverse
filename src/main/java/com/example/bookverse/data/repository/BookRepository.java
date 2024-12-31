package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {


    @Query(value = "SELECT * FROM book b WHERE b.title = :title AND b.author = :author AND b.publisher = :publisher", nativeQuery = true)
    Optional<BookEntity> findByTitleAndAuthorAndPublisher(@Param("title") String title, @Param("author") String author, @Param("publisher") String publisher);
}
