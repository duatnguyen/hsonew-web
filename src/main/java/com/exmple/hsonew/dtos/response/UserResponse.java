package com.exmple.hsonew.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse extends BaseResponse {
    private boolean success;
    private String message;
    private UserData user;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserData {
        private Integer id;
        private String username;
        private List<String> listChar;
        private String email;
        private String phone;
        private Integer coin;
        private LocalDateTime createTime;
        private Integer status;
        private Integer lock;
    }
}