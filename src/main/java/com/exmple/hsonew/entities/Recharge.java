package com.exmple.hsonew.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "nap_tien")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "code")
    private String code;

    @Column(name = "name_player", nullable = false, length = 100)
    private String namePlayer;

    @Column(name = "admin", length = 100)
    private String admin;

    @Column(name = "type_nap", length = 50)
    private String typeNap;

    @Column(name = "so_tien", nullable = false)
    private Integer soTien;

    @Column(name = "ngoc_nap", nullable = false)
    private Integer ngocNap;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "ip_nap", length = 45)
    private String ipNap;

    @Column(name = "device", length = 100)
    private String device;

    @Column(name = "ghi_chu", columnDefinition = "TEXT")
    private String ghiChu;

    @Column(name = "thoi_gian", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime thoiGian;
}