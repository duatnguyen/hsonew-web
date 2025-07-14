package com.exmple.hsonew.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponse extends BaseResponse {
    private AccountData account;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccountData {
        private Integer id;
        private String username;
        private String password;
        private String email;
        private String phone;
        private Integer coin;
        private Integer acAdmin;
        private List<String> charNames;
        private Integer status;
        private Integer lock;
        private String ip;
        private String lastIp;
        private Integer tiennap;
        private String pass2;
        private Integer naptuan;
        private Integer tongnap;
        private String otp;
        private Integer expirationOtp;
        private Integer token;
        private LocalDateTime createTime;
    }
}