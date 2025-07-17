package com.exmple.hsonew.dtos.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private Integer id;
    private String username;
    private List<String> listChar;
    private String email;
    private String phone;
    private LocalDateTime createTime;
    private Integer status;
    private String token;
    private String rolename;
}
