package com.exmple.hsonew.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "giftcode")
public class GiftCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "giftname", length = 255)
    private String giftname;

    @Column(name = "item3", columnDefinition = "TEXT")
    private String item3;

    @Column(name = "item4", columnDefinition = "TEXT")
    private String item4;

    @Column(name = "item7", columnDefinition = "TEXT")
    private String item7;

    @Column(name = "item47random", columnDefinition = "TEXT")
    private String item47random;

    @Column(name = "countrandom", columnDefinition = "TINYINT DEFAULT 0")
    private Integer countrandom = 0;

    @Column(name = "vang")
    private Long vang;

    @Column(name = "ngoc")
    private Integer ngoc;

    @Column(name = "empty_box", nullable = false)
    private Integer emptyBox;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "limit")
    private Integer limit;

    @Column(name = "limit_use")
    private Integer limitUse;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;
}
