package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.ChangePasswordRequest;
import com.exmple.hsonew.dtos.request.LoginRequest;
import com.exmple.hsonew.dtos.request.RegisterRequest;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.services.AccountService;
import com.exmple.hsonew.dtos.response.ApiResponse;
import com.exmple.hsonew.dtos.response.AccountResponse;
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
    public ResponseEntity<ApiResponse<AccountResponse>> register(@RequestBody RegisterRequest request) {
        try {
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Tên đăng nhập không được để trống", null)
                );
            }
            if (request.getPassword() == null || request.getPassword().length() < 6) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Mật khẩu phải có ít nhất 6 ký tự", null)
                );
            }
            AccountResponse userData = accountService.register(
                request.getUsername().trim(),
                request.getPassword(),
                request.getEmail(),
                request.getPhone()
            );
            return ResponseEntity.ok(
                new ApiResponse<>(true, "Đăng ký thành công", userData)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AccountResponse>> login(@RequestBody LoginRequest request) {
        try {
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Tên đăng nhập không được để trống", null)
                );
            }
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Mật khẩu không được để trống", null)
                );
            }
            AccountResponse userData = accountService.login(request.getUsername().trim(), request.getPassword());
            return ResponseEntity.ok(
                new ApiResponse<>(true, "Đăng nhập thành công", userData)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            accountService.changePassword(request.getAccountId(), request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok(
                new ApiResponse<>(true, "Đổi mật khẩu thành công", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }
    
    @GetMapping("/account/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccount(@PathVariable Integer id) {
        try {
            Account account = accountService.findById(id).orElse(null);
            if (account == null) {
                return ResponseEntity.status(404).body(
                    new ApiResponse<>(false, "Tài khoản không tồn tại", null)
                );
            }
            AccountResponse userData = new AccountResponse(account);
            return ResponseEntity.ok(
                new ApiResponse<>(true, null, userData)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }
    
}