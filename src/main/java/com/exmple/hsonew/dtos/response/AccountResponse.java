package com.exmple.hsonew.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AccountResponse extends BaseResponse {
    private boolean success;
    private String message;
    private AccountData account;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
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
        private String otp;
        private Integer expirationOtp;
        private Integer token;
        private LocalDateTime createTime;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TokenData {
        private String accessToken;
        private String refreshToken;
    }

}