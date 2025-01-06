package com.example.bookverse.data.repository;


import com.example.bookverse.data.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {

    @Query(value = "SELECT * FROM book b WHERE b.book_id = :bookid", nativeQuery = true)
    Optional<BookEntity> findByBookId(@Param("bookid") Long bookid);

    boolean existsByTitleAndAuthorAndPublisher(String title, String author, String publisher);

    @Query("SELECT b FROM BookEntity b WHERE b.title LIKE %:query% OR b.author LIKE %:query%")
    List<BookEntity> findBooksByQuery(@Param("query") String query);

    @Query("SELECT b FROM BookEntity b WHERE b.category = :category")
    List<BookEntity> findByCategory(@Param("category") String category);

    @Query("SELECT b FROM BookEntity b WHERE b.category = :category")
    Page<BookEntity> findByCategory(@Param("category") String category, Pageable pageable);

    @Query("SELECT b FROM BookEntity b")
    Page<BookEntity> findAllBooks(Pageable pageable);

}


