package com.exmple.hsonew.dtos.response;


import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String success;
    private String message;
}
