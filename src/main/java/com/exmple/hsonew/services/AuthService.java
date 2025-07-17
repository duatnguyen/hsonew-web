package com.exmple.hsonew.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.exmple.hsonew.config.JwtService;
import com.exmple.hsonew.config.UserDetailsImpl;
import com.exmple.hsonew.dtos.request.LoginRequest;
import com.exmple.hsonew.dtos.request.RegisterRequest;
import com.exmple.hsonew.dtos.response.LoginResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.entities.JwtBlacklist;
import com.exmple.hsonew.entities.Role;
import com.exmple.hsonew.repositories.AccountRepository;
import com.exmple.hsonew.repositories.JwtBlacklistRepository;
import com.exmple.hsonew.repositories.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private AccountRepository accountRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtBlacklistRepository blacklistRepository;
    private final RoleRepository roleRepository;

    public Account registerAccount(RegisterRequest request, String ip) {
        if (accountRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Tài khoản đã tồn tại");

        if (accountRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Số điện thoại đã tồn tại.");
        }

        Role role = roleRepository.findByName("customer")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role"));

        Account user = Account.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .phone(request.getPhone())
                .createTime(LocalDateTime.now())
                .ip(ip)
                .coin(0)
                .role(role)
                .build();
        return accountRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword()));

            Account user = ((UserDetailsImpl) auth.getPrincipal()).getUser();
            String token = jwtService.generateToken(user);

            List<String> listChar = (user.getCharNames() != null
                    && !user.getCharNames().isEmpty())
                            ? Arrays.asList(user.getCharNames().split(","))
                            : Collections.emptyList();

            return new LoginResponse(user.getId(), user.getUsername(), listChar, user.getEmail(),
                    user.getPhone(), user.getCreateTime(), user.getStatus(), token, user.getRole().getName());
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Tên đăng nhập hoặc mật khẩu không đúng");
        }
    }

    public void logout(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);

            if (jwtService.validateToken(jwt)) {
                JwtBlacklist blacklistEntry = JwtBlacklist.builder()
                        .token(jwt)
                        .expiryDate(new java.sql.Date(jwtService.extractExpirationDate(jwt).getTime()))
                        .build();

                blacklistRepository.save(blacklistEntry);
            }
        }
    }

}
