package com.example.bookverse.service;

import com.example.bookverse.data.entity.*;
import com.example.bookverse.data.repository.*;
import com.example.bookverse.data.request.RequestBuyDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

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
                    .price(requestBuyDTO.getPrice()*requestBuyDTO.getQuantity())
                    .build();
            purchaseRepository.save(purchaseEntity);
            deleteCart(email, requestBuyDTO.getBookId());
        }
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
}
