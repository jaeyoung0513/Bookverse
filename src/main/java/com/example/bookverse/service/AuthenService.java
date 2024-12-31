package com.example.bookverse.service;

import com.example.bookverse.data.entity.UserEntity;
import com.example.bookverse.data.repository.RoleRepository;
import com.example.bookverse.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AuthenService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = this.userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        roleRepository.findRolesByEmail(email).forEach(role -> {
            grantedAuthorities.add(new SimpleGrantedAuthority(role));
        });

        return new User(user.getEmail(), user.getPw(), grantedAuthorities);
    }
}
