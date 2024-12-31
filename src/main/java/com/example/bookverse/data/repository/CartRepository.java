package com.example.bookverse.data.repository;

import com.example.bookverse.data.entity.CartEntity;
import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<CartEntity, Long> {
}
