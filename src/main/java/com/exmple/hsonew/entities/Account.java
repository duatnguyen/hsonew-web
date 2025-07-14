package com.exmple.hsonew.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user", unique = true, nullable = false, length = 255)
    @NotBlank(message = "Tên đăng nhập không được để trống")
    @Size(min = 3, max = 255, message = "Tên đăng nhập phải từ 3-255 ký tự")
    private String username;

    @Column(name = "pass", nullable = false, length = 255)
    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    private String password;

    @Column(name = "email", length = 255)
    @Email(message = "Email không hợp lệ")
    private String email;

    @Column(name = "`char`")
    private String charNames;

    @Column(name = "phone", length = 255)
    private String phone;

    @Column(name = "coin", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer coin = 0;

    @Column(name = "ac_admin", columnDefinition = "TINYINT DEFAULT 0")
    private Integer acAdmin = 0;

    @Column(name = "status", columnDefinition = "TINYINT DEFAULT 1")
    private Integer status = 1;

    @Column(name = "is_locked", columnDefinition = "TINYINT DEFAULT 0")
    private Integer lock = 0;

    @Column(name = "ip", length = 255, nullable = true)
    private String ip;

    @Column(name = "last_ip", length = 100)
    private String lastIp;

    @Column(name = "tiennap", columnDefinition = "INT DEFAULT 0")
    private Integer tiennap = 0;

    @Column(name = "pass2", length = 255)
    private String pass2;

    @Column(name = "naptuan", columnDefinition = "INT DEFAULT 0")
    private Integer naptuan = 0;

    @Column(name = "tongnap", columnDefinition = "INT DEFAULT 0")
    private Integer tongnap = 0;

    @Column(name = "otp", columnDefinition = "TEXT")
    private String otp;

    @Column(name = "expiration_otp", columnDefinition = "INT")
    private Integer expirationOtp;

    @Column(name = "token", columnDefinition = "INT")
    private Integer token;

    @Column(name = "create_time")
    private LocalDateTime createTime;

}
