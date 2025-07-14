package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.ChangePasswordRequest;
import com.exmple.hsonew.dtos.request.LoginRequest;
import com.exmple.hsonew.dtos.request.RegisterRequest;
import com.exmple.hsonew.dtos.response.BaseResponse;
import com.exmple.hsonew.dtos.response.UserResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.services.AccountService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

        @Autowired
        private AccountService accountService;

        @PostMapping("/register")
        public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request,
                        HttpServletRequest req) {
                try {
                        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                                return ResponseEntity.badRequest().body(
                                                UserResponse.builder()
                                                                .success(false)
                                                                .message("Tên đăng nhập không được để trống")
                                                                .build());
                        }

                        if (request.getPassword() == null || request.getPassword().length() < 6) {
                                return ResponseEntity.badRequest().body(
                                                UserResponse.builder()
                                                                .success(false)
                                                                .message("Mật khẩu phải có ít nhất 6 ký tự")
                                                                .build());
                        }

                        String ip = req.getHeader("X-Forwarded-For");
                        if (ip == null || ip.isEmpty()) {
                                ip = req.getRemoteAddr();
                        }
                        if ("0:0:0:0:0:0:0:1".equals(ip) || "::1".equals(ip)) {
                                ip = "127.0.0.1";
                        }

                        Account account = accountService.register(
                                        request.getUsername().trim(),
                                        request.getPassword(),
                                        request.getEmail(),
                                        request.getPhone(),
                                        ip);

                        // Parse charNames to list
                        java.util.List<String> listChar = (account.getCharNames() != null
                                        && !account.getCharNames().isEmpty())
                                                        ? Arrays.asList(account.getCharNames().split(","))
                                                        : Collections.emptyList();

                        return ResponseEntity.ok(
                                        UserResponse.builder()
                                                        .success(true)
                                                        .message("Đăng ký thành công")
                                                        .user(new UserResponse.UserData(
                                                                        account.getId(),
                                                                        account.getUsername(),
                                                                        account.getPassword(),
                                                                        listChar,
                                                                        account.getEmail(),
                                                                        account.getPhone(),
                                                                        account.getCoin(),
                                                                        account.getCreateTime(),
                                                                        account.getStatus(),
                                                                        account.getLock()))
                                                        .build());

                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(
                                        UserResponse.builder()
                                                        .success(false)
                                                        .message(e.getMessage())
                                                        .build());
                }
        }

        @PostMapping("/login")
        public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest request) {
                try {
                        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                                return ResponseEntity.badRequest().body(
                                                UserResponse.builder()
                                                                .success(false)
                                                                .message("Tên đăng nhập không được để trống")
                                                                .build());
                        }

                        if (request.getPassword() == null || request.getPassword().isEmpty()) {
                                return ResponseEntity.badRequest().body(
                                                UserResponse.builder()
                                                                .success(false)
                                                                .message("Mật khẩu không được để trống")
                                                                .build());
                        }

                        Account account = accountService.login(request.getUsername().trim(), request.getPassword());

                        // Parse charNames to list
                        java.util.List<String> listChar = (account.getCharNames() != null
                                        && !account.getCharNames().isEmpty())
                                                        ? Arrays.asList(account.getCharNames().split(","))
                                                        : Collections.emptyList();

                        return ResponseEntity.ok(
                                        UserResponse.builder()
                                                        .success(true)
                                                        .message("Đăng nhập thành công")
                                                        .user(new UserResponse.UserData(
                                                                        account.getId(),
                                                                        account.getUsername(),
                                                                        account.getPassword(),
                                                                        listChar,
                                                                        account.getEmail(),
                                                                        account.getPhone(),
                                                                        account.getCoin(),
                                                                        account.getCreateTime(),
                                                                        account.getStatus(),
                                                                        account.getLock()))
                                                        .build());

                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(
                                        UserResponse.builder()
                                                        .success(false)
                                                        .message(e.getMessage())
                                                        .build());
                }
        }

        @PostMapping("/change-password")
        public ResponseEntity<BaseResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
                try {
                        accountService.changePassword(request.getAccountId(), request.getOldPassword(),
                                        request.getNewPassword());

                        return ResponseEntity.ok(
                                        BaseResponse.builder()
                                                        .success(true)
                                                        .message("Đổi mật khẩu thành công")
                                                        .build());

                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(
                                        BaseResponse.builder()
                                                        .success(false)
                                                        .message(e.getMessage())
                                                        .build());
                }
        }

}