package com.exmple.hsonew.dtos;

import java.time.LocalDateTime;

import com.exmple.hsonew.entities.Account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private String phone;
    private Integer coin;
    private LocalDateTime createTime;
    private Integer status;
    private Integer lock;

    public UserDTO toUserDTO(Account account) {
        return new UserDTO(
                account.getId(),
                account.getUsername(),
                account.getEmail(),
                account.getPhone(),
                account.getCoin(),
                account.getCreateTime(),
                account.getStatus(),
                account.getLock());
    }


}
