package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.response.AccountResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.services.AccountService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("")
    public ResponseEntity<List<AccountResponse.AccountData>> getAllAccounts() {
        return ResponseEntity.ok(accountService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> getAccountById(@PathVariable Integer id) {
        Optional<AccountResponse.AccountData> account = accountService.findById(id);
        if (account.isPresent()) {
            return ResponseEntity.ok(AccountResponse.builder()
                    .success(true)
                    .message("Lấy account thành công")
                    .account(account.get())
                    .build());
        } else {
            return ResponseEntity.status(404).body(AccountResponse.builder()
                    .success(false)
                    .message("Account không tồn tại")
                    .build());
        }
    }

    @PostMapping("")
    public ResponseEntity<AccountResponse> createAccount(@RequestBody Account account) {
        AccountResponse.AccountData saved = accountService.save(account);
        return ResponseEntity.ok(AccountResponse.builder()
                .success(true)
                .message("Tạo account thành công")
                .account(saved)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountResponse> updateAccount(@PathVariable Integer id, HttpServletRequest request,
            @RequestBody Account account) {
        if (!accountService.findById(id).isPresent()) {
            return ResponseEntity.status(404).body(AccountResponse.builder()
                    .success(false)
                    .message("Account không tồn tại")
                    .build());
        }
        account.setId(id);

        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty()) {
            ip = request.getRemoteAddr();
        }
        account.setIp(ip);
        AccountResponse.AccountData updated = accountService.save(account);
        return ResponseEntity.ok(AccountResponse.builder()
                .success(true)
                .message("Cập nhật account thành công")
                .account(updated)
                .build());
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<AccountResponse> deleteAccount(@PathVariable Integer id) {
    //     if (!accountService.findById(id).isPresent()) {
    //         return ResponseEntity.status(404).body(AccountResponse.builder()
    //                 .success(false)
    //                 .message("Account không tồn tại")
    //                 .build());
    //     }
    //     accountService.deleteById(id);
    //     return ResponseEntity.ok(AccountResponse.builder()
    //             .success(true)
    //             .message("Xóa account thành công")
    //             .build());
    // }
}