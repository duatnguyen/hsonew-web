package com.exmple.hsonew.controllers;

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
    
    public static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private String phone;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
    }
    
    public static class ChangePasswordRequest {
        private Integer accountId;
        private String oldPassword;
        private String newPassword;
        
        public Integer getAccountId() { return accountId; }
        public void setAccountId(Integer accountId) { this.accountId = accountId; }
        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
} 