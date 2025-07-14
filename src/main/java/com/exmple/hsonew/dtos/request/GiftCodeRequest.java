package com.exmple.hsonew.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GiftCodeRequest {
    private String giftname;
    private String item3;
    private String item4;
    private String item7;
    private String item47random;
    private Integer countrandom;
    private Long vang;
    private Integer ngoc;
    private Integer emptyBox;
    private String message;
    private Integer limit;
    private Integer limitUse;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
} 