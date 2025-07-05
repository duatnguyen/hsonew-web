package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.ChangePasswordRequest;
import com.exmple.hsonew.dtos.request.LoginRequest;
import com.exmple.hsonew.dtos.request.RegisterRequest;
import com.exmple.hsonew.dtos.response.BaseResponse;
import com.exmple.hsonew.dtos.response.UserResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.services.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {
    
    @Autowired
    private AccountService accountService;
    
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    UserResponse.builder()
                        .success(false)
                        .message("Tên đăng nhập không được để trống")
                        .build()
                );
            }
            
            if (request.getPassword() == null || request.getPassword().length() < 6) {
                return ResponseEntity.badRequest().body(
                    UserResponse.builder()
                        .success(false)
                        .message("Mật khẩu phải có ít nhất 6 ký tự")
                        .build()
                );
            }
            
            Account account = accountService.register(
                request.getUsername().trim(),
                request.getPassword(),
                request.getEmail(),
                request.getPhone()
            );
            
            return ResponseEntity.ok(
                UserResponse.builder()
                    .success(true)
                    .message("Đăng ký thành công")
                    .user(new UserResponse.UserData(
                        account.getId(),
                        account.getUsername(),
                        account.getEmail(),
                        account.getPhone(),
                        account.getCoin(),
                        account.getCreateTime(),
                        account.getStatus(),
                        account.getLock()
                    ))
                    .build()
            );
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                UserResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build()
            );
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
                        .build()
                );
            }
            
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    UserResponse.builder()
                        .success(false)
                        .message("Mật khẩu không được để trống")
                        .build()
                );
            }
            
            Account account = accountService.login(request.getUsername().trim(), request.getPassword());
            
            return ResponseEntity.ok(
                UserResponse.builder()
                    .success(true)
                    .message("Đăng nhập thành công")
                    .user(new UserResponse.UserData(
                        account.getId(),
                        account.getUsername(),
                        account.getEmail(),
                        account.getPhone(),
                        account.getCoin(),
                        account.getCreateTime(),
                        account.getStatus(),
                        account.getLock()
                    ))
                    .build()
            );
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                UserResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build()
            );
        }
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<BaseResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        try {
            accountService.changePassword(request.getAccountId(), request.getOldPassword(), request.getNewPassword());
            
            return ResponseEntity.ok(
                BaseResponse.builder()
                    .success(true)
                    .message("Đổi mật khẩu thành công")
                    .build()
            );
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                BaseResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build()
            );
        }
    }
    
    @GetMapping("/account/{id}")
    public ResponseEntity<UserResponse> getAccount(@PathVariable Integer id) {
        try {
            Account account = accountService.findById(id).orElse(null);
            
            if (account == null) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(
                UserResponse.builder()
                    .success(true)
                    .user(new UserResponse.UserData(
                        account.getId(),
                        account.getUsername(),
                        account.getEmail(),
                        account.getPhone(),
                        account.getCoin(),
                        account.getCreateTime(),
                        account.getStatus(),
                        account.getLock()
                    ))
                    .build()
            );
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                UserResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build()
            );
        }
    }
}