package com.exmple.hsonew.services;

import com.exmple.hsonew.config.JwtService;
import com.exmple.hsonew.config.UserDetailsImpl;
import com.exmple.hsonew.dtos.request.LoginRequest;
import com.exmple.hsonew.dtos.response.AccountResponse;
import com.exmple.hsonew.dtos.response.LoginResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.repositories.AccountRepository;
import com.exmple.hsonew.repositories.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;

    public AccountResponse.TokenData changePasswordAndIssueToken(Integer accountId, String oldPassword,
            String newPassword) throws Exception {
        Optional<Account> accountOpt = accountRepository.findById(accountId);

        if (!accountOpt.isPresent()) {
            throw new Exception("Tài khoản không tồn tại");
        }

        Account account = accountOpt.get();

        // Kiểm tra mật khẩu cũ
        if (!oldPassword.equals(account.getPassword())) {
            throw new Exception("Mật khẩu cũ không chính xác");
        }

        // Cập nhật mật khẩu mới và lastPasswordChange
        account.setPassword(newPassword);
        // account.setLastPasswordChange(LocalDateTime.now());
        accountRepository.save(account);

        // Xóa toàn bộ refresh token cũ của user
        refreshTokenRepository.deleteByUser(account);

        // Tạo access token và refresh token mới
        String accessToken = jwtService.generateToken(account);
        String refreshToken = jwtService.generateRefreshToken(account);

        return AccountResponse.TokenData.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Account updateAccount(Integer accountId, String email, String phone) throws Exception {
        Optional<Account> accountOpt = accountRepository.findById(accountId);

        if (!accountOpt.isPresent()) {
            throw new Exception("Tài khoản không tồn tại");
        }

        Account account = accountOpt.get();

        // Kiểm tra email trùng (nếu thay đổi)
        if (email != null && !email.equals(account.getEmail())) {
            if (accountRepository.existsByEmail(email)) {
                throw new Exception("Email đã được sử dụng");
            }
            account.setEmail(email);
        }

        // Cập nhật phone
        if (phone != null) {
            account.setPhone(phone);
        }

        return accountRepository.save(account);
    }

    public Optional<AccountResponse.AccountData> findById(Integer id) {
        return accountRepository.findById(id).map(this::toAccountData);
    }

    public List<AccountResponse.AccountData> findAll() {
        return accountRepository.findAll().stream().map(this::toAccountData).collect(Collectors.toList());
    }

    public AccountResponse.AccountData save(Account account) {
        return toAccountData(accountRepository.save(account));
    }

    public void deleteById(Integer id) {
        accountRepository.deleteById(id);
    }

    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    private AccountResponse.AccountData toAccountData(Account account) {
        List<String> charNamesList = (account.getCharNames() != null && !account.getCharNames().isEmpty())
                ? Arrays.asList(account.getCharNames().split(","))
                : Collections.emptyList();
        return new AccountResponse.AccountData(
                account.getId(),
                account.getUsername(),
                account.getPassword(),
                account.getEmail(),
                account.getPhone(),
                account.getCoin(),
                account.getAcAdmin(),
                charNamesList,
                account.getStatus(),
                account.getLock(),
                account.getIp(),
                account.getLastIp(),
                account.getOtp(),
                account.getExpirationOtp(),
                account.getToken(),
                account.getCreateTime());
    }
}