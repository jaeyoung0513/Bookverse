package com.example.bookverse.configure;

import com.example.bookverse.component.CustomAccessDeniedHandler;
import com.example.bookverse.component.CustomAuthenticationEntryPoint;
import com.example.bookverse.jwt.JwtFilter;
import com.example.bookverse.jwt.JwtUtil;
import com.example.bookverse.jwt.LoginFilter;
import com.example.bookverse.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtUtil jwtUtil;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, PurchaseService purchaseService) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .formLogin(formLogin -> formLogin.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/", "api/user/login", "/api/user/join","/api/user/update/{id}","/api/user/userlist",
                                        "/api/user/find/id", "/api/user/find/pw",
                                        "/api/book/search", "/api/book/add", "/api/book/edit/{id}",
                                        "/api/reissue",
                                        "/api/purchase/purchaseList", "/api/purchase/membersPurchaseList",
                                        "/api/review/add", "/api/review/book/{bookId}", "/api/review/user/{userId}","/api/review/edit", "/api/review/delete"
                                ).permitAll()
                                .requestMatchers("/api/admin").hasRole("ADMIN")
                                .anyRequest().authenticated());

        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.addAllowedOrigin("http://localhost:3000");
            config.addAllowedMethod("*");
            config.addAllowedHeader("*");
            config.setAllowCredentials(true);
            config.addExposedHeader("Authorization");
            return config;
        }));

        http.sessionManagement(session -> {
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        });

        http.addFilterBefore(new JwtFilter(this.jwtUtil), LoginFilter.class);

        http.addFilterAt(new LoginFilter(authenticationManager(this.authenticationConfiguration), this.jwtUtil), UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling(exception -> {
            exception.authenticationEntryPoint(this.customAuthenticationEntryPoint);
            exception.accessDeniedHandler(this.customAccessDeniedHandler);
        });

        return http.build();
    }
}
