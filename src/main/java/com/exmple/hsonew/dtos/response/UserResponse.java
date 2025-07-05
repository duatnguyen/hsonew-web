package com.exmple.hsonew.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse extends BaseResponse {
    private UserData user;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserData {
        private Integer id;
        private String username;
        private String email;
        private String phone;
        private Integer coin;
        private LocalDateTime createTime;
        private Integer status;
        private Integer lock;
    }
} 