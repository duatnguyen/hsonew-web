package com.exmple.hsonew.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
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
    
    @Column(name = "phone", length = 255)
    private String phone;
    
    @Column(name = "coin", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer coin = 0;
    
    @Column(name = "ac_admin", columnDefinition = "TINYINT DEFAULT 0")
    private Integer acAdmin = 0;
    
    @Column(name = "char_name", length = 255)
    private String charName;
    
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
    
    // Constructors
    public Account() {
    }
    
    public Account(String username, String password, String email, String phone) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.coin = 0;
        this.status = 1;
        this.lock = 0;
        this.acAdmin = 0;
    }
    
    // Getters and Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public Integer getCoin() {
        return coin;
    }
    
    public void setCoin(Integer coin) {
        this.coin = coin;
    }
    
    public LocalDateTime getCreateTime() {
        return createTime;
    }
    
    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }
    
    public Integer getAcAdmin() {
        return acAdmin;
    }
    
    public void setAcAdmin(Integer acAdmin) {
        this.acAdmin = acAdmin;
    }
    
    public String getCharName() {
        return charName;
    }
    
    public void setCharName(String charName) {
        this.charName = charName;
    }
    
    public Integer getStatus() {
        return status;
    }
    
    public void setStatus(Integer status) {
        this.status = status;
    }
    
    public Integer getLock() {
        return lock;
    }
    
    public void setLock(Integer lock) {
        this.lock = lock;
    }
    
    public String getIp() {
        return ip;
    }
    
    public void setIp(String ip) {
        this.ip = ip;
    }
    
    public String getLastIp() {
        return lastIp;
    }
    
    public void setLastIp(String lastIp) {
        this.lastIp = lastIp;
    }
    
    public Integer getTiennap() {
        return tiennap;
    }
    
    public void setTiennap(Integer tiennap) {
        this.tiennap = tiennap;
    }
    
    public String getPass2() {
        return pass2;
    }
    
    public void setPass2(String pass2) {
        this.pass2 = pass2;
    }
    
    public Integer getNaptuan() {
        return naptuan;
    }
    
    public void setNaptuan(Integer naptuan) {
        this.naptuan = naptuan;
    }
    
    public Integer getTongnap() {
        return tongnap;
    }
    
    public void setTongnap(Integer tongnap) {
        this.tongnap = tongnap;
    }
    
    public String getOtp() {
        return otp;
    }
    
    public void setOtp(String otp) {
        this.otp = otp;
    }
    
    public Integer getExpirationOtp() {
        return expirationOtp;
    }
    
    public void setExpirationOtp(Integer expirationOtp) {
        this.expirationOtp = expirationOtp;
    }
    
    public Integer getToken() {
        return token;
    }
    
    public void setToken(Integer token) {
        this.token = token;
    }
    
    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", coin=" + coin +
                ", createTime=" + createTime +
                ", status=" + status +
                ", lock=" + lock +
                '}';
    }
}
