package com.exmple.hsonew.dtos.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponse {
    private Integer id;
    private String username;
    private String email;
    private String phone;
    private Integer coin;
    private LocalDateTime createTime;
    private Integer status;
    private Integer lock;

}