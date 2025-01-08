package com.example.bookverse.service;

import com.example.bookverse.data.dto.BookDTO;
import com.example.bookverse.data.dto.PurchaseDTO;
import com.example.bookverse.data.entity.*;
import com.example.bookverse.data.repository.*;
import com.example.bookverse.data.request.RequestBuyDTO;
import com.example.bookverse.data.response.Top5BooksResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PurchaseService {
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

    public List<PurchaseDTO> getPurchasesByUser(String email) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("해당 이메일의 사용자를 찾을 수 없습니다.");
        }

        List<PurchaseEntity> purchases = purchaseRepository.findByUserId(user.getId());
        return purchases.stream()
                .map(purchase -> PurchaseDTO.builder()
                        .bookTitle(purchase.getBook().getTitle())
                        .quantity(purchase.getQuantity())
                        .price(purchase.getPrice())
                        .orderDate(purchase.getOrderDate())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public BookEntity existsByBookId(Long bookId) {
        BookEntity book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("해당 도서를 찾을 수 없습니다."));
        return book;
    }

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
                    .price(requestBuyDTO.getPrice() * requestBuyDTO.getQuantity())
                    .build();
            purchaseRepository.save(purchaseEntity);
            deleteCart(email, requestBuyDTO.getBookId());
        }
    }
    public List<BookDTO> getWishlistByUser(String email) {
        // 사용자 검증
        UserEntity user = existsByEmail(email);
        
        // 위시리스트 조회
        List<WishlistEntity> wishlist = wishlistRepository.findByUserEmail(user.getEmail());
        
        if (wishlist == null || wishlist.isEmpty()) {
            return Collections.emptyList(); // 빈 목록 반환
        }
        
        // WishlistEntity -> BookDTO 변환
        return wishlist.stream()
                .map(wish -> {
                    BookEntity book = wish.getBook();
                    return BookDTO.builder()
                            .id(book.getId())
                            .title(book.getTitle())
                            .desc(book.getDesc())
                            .author(book.getAuthor())
                            .publisher(book.getPublisher())
                            .category(book.getCategory())
                            .quantity(book.getQuantity())
                            .price(book.getPrice())
                            .image(book.getImage())
                            .build();
                })
                .collect(Collectors.toList());
    }
    
    
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
    
    public void clearCart(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("유효하지 않은 이메일입니다.");
        }
        // Fetch the user by email
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("사용자를 찾을 수 없습니다.");
        }
        
        // Clear all cart items for the user
        cartRepository.deleteAllByUser(user);
    }

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
        UserEntity user = existsByEmail(email); // 사용자 검증
        wishlistRepository.findByUserEmailAndBookId(user.getEmail(), bookId) // 이메일과 책 ID로 찾기
                .ifPresent(wishlist -> wishlistRepository.deleteById(wishlist.getId())); // 삭제
    }
    
    
    public List<BookDTO> findTop5Books() {
        List<Top5BooksResponse> top5Books = purchaseRepository.findTop5Books();
        List<BookDTO> books = new ArrayList<>();
        top5Books.stream().forEach(top5Book -> {
            Optional<BookEntity> optionalBook = bookRepository.findById(top5Book.getBookId());
            if (optionalBook.isPresent()) {
                BookEntity bookEntity = optionalBook.get();
                BookDTO bookDTO = BookDTO.builder()
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
                books.add(bookDTO);
            }
        });
        return books;
    }

    public List<BookDTO> findTop5BooksByCategory(String category) {
        List<Top5BooksResponse> top5Books = purchaseRepository.findTop5BooksByCategory(category);
        List<BookDTO> books = new ArrayList<>();
        top5Books.stream().forEach(top5Book -> {
            Optional<BookEntity> optionalBook = bookRepository.findById(top5Book.getBookId());
            if (optionalBook.isPresent()) {
                BookEntity bookEntity = optionalBook.get();
                BookDTO bookDTO = BookDTO.builder()
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
                books.add(bookDTO);
            }
        });
        return books;
    }

    public List<PurchaseDTO> getAllPurchases() {
        List<PurchaseEntity> purchases = purchaseRepository.findAll();
        return purchases.stream()
                .map(purchase -> PurchaseDTO.builder()
                        .bookTitle(purchase.getBook().getTitle())
                        .quantity(purchase.getQuantity())
                        .price(purchase.getPrice())
                        .orderDate(purchase.getOrderDate())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
