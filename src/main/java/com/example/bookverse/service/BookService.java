package com.example.bookverse.service;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.entity.*;
import com.example.bookverse.data.repository.*;
import com.example.bookverse.data.request.RequestBuyDTO;
import com.example.bookverse.data.request.RequestDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;
    private final CartRepository cartRepository;
    private final WishlistRepository wishlistRepository;
    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;

    public UserEntity existsByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("해당 아이디는 없는 아이디입니다.");
        }
        return user;
    }

    public BookEntity existsByBookId(Long bookId) {
        BookEntity book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("해당 도서를 찾을 수 없습니다."));
        return book;
    }

    // 결제
    @Transactional
    public void buyBook(String email, List<RequestBuyDTO> requestBuyDTOS) {
        UserEntity user = existsByEmail(email);
        for (RequestBuyDTO requestBuyDTO : requestBuyDTOS) {
            BookEntity bookEntity = bookRepository.findById(requestBuyDTO.getBookId()).orElseThrow(() -> new EntityNotFoundException("해당 도서를 찾을 수 없습니다."));
            PurchaseEntity purchaseEntity = PurchaseEntity.builder()
                    .user(user)
                    .book(bookEntity)
                    .quantity(requestBuyDTO.getQuantity())
                    .orderDate(LocalDateTime.now())
                    .price(requestBuyDTO.getPrice()*requestBuyDTO.getQuantity())
                    .build();
            purchaseRepository.save(purchaseEntity);
            deleteCart(email, requestBuyDTO.getBookId());
        }
    }

    // 장바구니에 추가
    public void addCart(String email, Long bookId, Integer quantity) {
        UserEntity user = existsByEmail(email);
        BookEntity book = existsByBookId(bookId);
        CartEntity cartEntity = cartRepository.findByUserIdAndBookId(user.getId(), bookId);
        if (cartEntity != null) {
            cartEntity.setQuantity(cartEntity.getQuantity() + quantity);
            cartRepository.save(cartEntity);
            return;
        }

        CartEntity cart = CartEntity.builder()
                .user(user)
                .book(book)
                .quantity(quantity)
                .build();
        cartRepository.save(cart);
    }

    public void deleteCart(String email, Long bookId) {
        UserEntity user = existsByEmail(email);
        CartEntity cartEntity = cartRepository.findByUserIdAndBookId(user.getId(), bookId);
        cartRepository.delete(cartEntity);
    }

    // 찜 추가
    public void addWish(String email, Long bookId) {
        UserEntity user = existsByEmail(email);
        BookEntity book = existsByBookId(bookId);

        WishlistEntity wishlist = WishlistEntity.builder()
                .user(user)
                .book(book)
                .build();
        wishlistRepository.save(wishlist);
    }

    public void deleteWish(String email, Long bookId) {
        existsByEmail(email);
        wishlistRepository.findById(bookId).ifPresent(wishlist -> {
            wishlistRepository.deleteById(wishlist.getId());
        });
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
