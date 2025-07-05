package com.exmple.hsonew.dtos.response;

import java.time.LocalDateTime;

import com.exmple.hsonew.entities.Account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    private Integer id;
    private String username;
    private String email;
    private String phone;
    private Integer coin;
    private LocalDateTime createTime;
    private Integer status;
    private Integer lock;

    public AccountResponse(Account account) {
        this.id = account.getId();
        this.username = account.getUsername();
        this.email = account.getEmail();
        this.phone = account.getPhone();
        this.coin = account.getCoin();
        this.createTime = account.getCreateTime();
        this.status = account.getStatus();
        this.lock = account.getLock();
    }

    public static AccountResponse toAccountResponse(Account account) {
        return new AccountResponse(account);
    }
}
