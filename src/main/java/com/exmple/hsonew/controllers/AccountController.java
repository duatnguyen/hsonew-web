package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.ChangePasswordRequest;
import com.exmple.hsonew.dtos.response.AccountResponse;
import com.exmple.hsonew.dtos.response.BaseResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.services.AccountService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

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

    @Autowired
    private com.exmple.hsonew.config.JwtService jwtService;

    @GetMapping("")
    public ResponseEntity<List<AccountResponse.AccountData>> getAllAccounts() {
        return ResponseEntity.ok(accountService.findAll());
    }


    @PutMapping("/{id}")
    public ResponseEntity<AccountResponse> updateAccount(
            @PathVariable Integer id,
            HttpServletRequest request,
            @RequestBody Account accountUpdate,
            @RequestHeader("Authorization") String authorizationHeader) {

        // 1. Lấy username từ token
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);

        // 2. Lấy account từ username
        Optional<Account> accountOpt = accountService.findByUsername(username);
        if (accountOpt.isEmpty() || !accountOpt.get().getId().equals(id)) {
            // Không đúng user, trả về 403
            AccountResponse response = new AccountResponse(false, "Bạn không có quyền cập nhật thông tin user này",
                    null);
            return ResponseEntity.status(403).body(response);
        }

        Account account = accountOpt.get();

        // Chỉ cập nhật email và phone
        if (accountUpdate.getEmail() != null) {
            account.setEmail(accountUpdate.getEmail());
        }
        if (accountUpdate.getPhone() != null) {
            account.setPhone(accountUpdate.getPhone());
        }

        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty()) {
            ip = request.getRemoteAddr();
        }
        account.setIp(ip);

        AccountResponse.AccountData updated = accountService.save(account);
        AccountResponse response = new AccountResponse(true, "Cập nhật account thành công", updated);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/change-password")
    public ResponseEntity<BaseResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        try {
            AccountResponse.TokenData tokenData = accountService.changePasswordAndIssueToken(
                    request.getAccountId(), request.getOldPassword(), request.getNewPassword());

            return ResponseEntity.ok(
                    BaseResponse.builder()
                            .success(true)
                            .message("Đổi mật khẩu thành công")
                            .accessToken(tokenData.getAccessToken())
                            .refreshToken(tokenData.getRefreshToken())
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