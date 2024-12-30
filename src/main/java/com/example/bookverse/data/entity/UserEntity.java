package com.example.bookverse.data.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@Table(name = "user", schema = "bookverse")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "pw", nullable = false)
    private String pw;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "birthdate", nullable = false)
    private Long birthdate;

    @Column(name = "addr")
    private String addr;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "provider", length = 50)
    private String provider;

    @Column(name = "provider_id")
    private String providerId;


    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    @OneToMany(mappedBy = "user")
    private List<PurchaseEntity> purchases = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<ReviewEntity> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<RoleEntity> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<WishlistEntity> wishlists = new ArrayList<>();

}