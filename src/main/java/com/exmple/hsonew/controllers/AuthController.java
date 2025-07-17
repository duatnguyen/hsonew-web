package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.ChangePasswordRequest;
import com.exmple.hsonew.dtos.request.LoginRequest;
import com.exmple.hsonew.dtos.request.RegisterRequest;
import com.exmple.hsonew.dtos.response.ApiResponse;
import com.exmple.hsonew.dtos.response.BaseResponse;
import com.exmple.hsonew.dtos.response.LoginResponse;
import com.exmple.hsonew.dtos.response.UserResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.services.AccountService;
import com.exmple.hsonew.services.AuthService;

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
        private AuthService authService;

        @PostMapping("/register")
        public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request,
                        HttpServletRequest req) {
                try {
                        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                                UserResponse response = new UserResponse(false, "Tên đăng nhập không được để trống", null);
                                return ResponseEntity.badRequest().body(response);
                        }

                        if (request.getPassword() == null || request.getPassword().length() < 6) {
                                UserResponse response = new UserResponse(false, "Mật khẩu phải có ít nhất 6 ký tự", null);
                                return ResponseEntity.badRequest().body(response);
                        }

                        String ip = req.getHeader("X-Forwarded-For");
                        if (ip == null || ip.isEmpty()) {
                                ip = req.getRemoteAddr();
                        }
                        if ("0:0:0:0:0:0:0:1".equals(ip) || "::1".equals(ip)) {
                                ip = "127.0.0.1";
                        }

                        Account account = authService.registerAccount(request, ip);

                        java.util.List<String> listChar = (account.getCharNames() != null
                                        && !account.getCharNames().isEmpty())
                                                        ? Arrays.asList(account.getCharNames().split(","))
                                                        : Collections.emptyList();

                        UserResponse.UserData userData = new UserResponse.UserData(
                                account.getId(),
                                account.getUsername(),
                                listChar,
                                account.getEmail(),
                                account.getPhone(),
                                account.getCoin(),
                                account.getCreateTime(),
                                account.getStatus(),
                                account.getLock()
                        );
                        UserResponse response = new UserResponse(true, "Đăng ký thành công", userData);
                        return ResponseEntity.ok(response);

                } catch (Exception e) {
                        UserResponse response = new UserResponse(false, e.getMessage(), null);
                        return ResponseEntity.badRequest().body(response);
                }
        }

        @PostMapping("/login")
        public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
                LoginResponse account = authService.login(request);
                return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", account));
        }

        @PostMapping("/logout")
        public ResponseEntity<BaseResponse> logout(@RequestHeader("Authorization") String authorizationHeader) {
            authService.logout(authorizationHeader);
            return ResponseEntity.ok(
                BaseResponse.builder()
                    .success(true)
                    .message("Đăng xuất thành công")
                    .build()
            );
        }
}