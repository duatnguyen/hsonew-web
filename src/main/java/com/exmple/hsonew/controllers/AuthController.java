package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.ChangePasswordRequest;
import com.exmple.hsonew.dtos.request.LoginRequest;
import com.exmple.hsonew.dtos.request.RegisterRequest;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {
    
    @Autowired
    private AccountService accountService;
    
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Tên đăng nhập không được để trống");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (request.getPassword() == null || request.getPassword().length() < 6) {
                response.put("success", false);
                response.put("message", "Mật khẩu phải có ít nhất 6 ký tự");
                return ResponseEntity.badRequest().body(response);
            }
            
            Account account = accountService.register(
                request.getUsername().trim(),
                request.getPassword(),
                request.getEmail(),
                request.getPhone()
            );
            
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", account.getId());
            userData.put("username", account.getUsername());
            userData.put("email", account.getEmail());
            userData.put("phone", account.getPhone());
            userData.put("coin", account.getCoin());
            userData.put("createTime", account.getCreateTime());
            
            response.put("success", true);
            response.put("message", "Đăng ký thành công");
            response.put("user", userData);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Tên đăng nhập không được để trống");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                response.put("success", false);
                response.put("message", "Mật khẩu không được để trống");
                return ResponseEntity.badRequest().body(response);
            }
            
            Account account = accountService.login(request.getUsername().trim(), request.getPassword());
            
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", account.getId());
            userData.put("username", account.getUsername());
            userData.put("email", account.getEmail());
            userData.put("phone", account.getPhone());
            userData.put("coin", account.getCoin());
            userData.put("createTime", account.getCreateTime());
            userData.put("status", account.getStatus());
            userData.put("lock", account.getLock());
            
            response.put("success", true);
            response.put("message", "Đăng nhập thành công");
            response.put("user", userData);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody ChangePasswordRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            accountService.changePassword(request.getAccountId(), request.getOldPassword(), request.getNewPassword());
            
            response.put("success", true);
            response.put("message", "Đổi mật khẩu thành công");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/account/{id}")
    public ResponseEntity<Map<String, Object>> getAccount(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Account account = accountService.findById(id).orElse(null);
            
            if (account == null) {
                response.put("success", false);
                response.put("message", "Tài khoản không tồn tại");
                return ResponseEntity.notFound().build();
            }
            
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", account.getId());
            userData.put("username", account.getUsername());
            userData.put("email", account.getEmail());
            userData.put("phone", account.getPhone());
            userData.put("coin", account.getCoin());
            userData.put("createTime", account.getCreateTime());
            userData.put("status", account.getStatus());
            userData.put("lock", account.getLock());
            
            response.put("success", true);
            response.put("user", userData);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
}