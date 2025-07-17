package com.exmple.hsonew.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.entities.RefreshToken;
import com.exmple.hsonew.repositories.AccountRepository;
import com.exmple.hsonew.repositories.RefreshTokenRepository;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepo;

    @Autowired
    private AccountRepository userRepository;

    // Tạo token mới và lưu
    public RefreshToken createRefreshToken(Long userId) {
        Account user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setCreatedAt(Instant.now());
        token.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
        token.setRevoked(false);

        return refreshTokenRepo.save(token);
    }

    // Xác minh token
    public RefreshToken verifyToken(String tokenStr) {
        RefreshToken token = refreshTokenRepo.findByToken(tokenStr)
                .orElseThrow(() -> new RuntimeException("Token not found"));

        if (token.isRevoked() || token.getExpiresAt().isBefore(Instant.now())) {
            throw new RuntimeException("Token expired or revoked");
        }

        return token;
    }

    // Thu hồi tất cả token của user (ví dụ khi đổi mật khẩu)
    public void revokeAllByUser(Account user) {
        List<RefreshToken> tokens = refreshTokenRepo.findByUserAndRevokedFalse(user);
        for (RefreshToken token : tokens) {
            token.setRevoked(true);
        }
        refreshTokenRepo.saveAll(tokens);
    }
}
