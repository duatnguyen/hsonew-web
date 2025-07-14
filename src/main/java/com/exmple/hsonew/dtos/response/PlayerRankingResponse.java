package com.exmple.hsonew.dtos.response;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerRankingResponse {
    private String name;
    private Byte clazz;
    private Integer level;
    private Integer kimcuong;
    private Long vang;
    private Integer pointArena;
    private Integer pointDanhVong;
    private Integer pointNapKcSave;
    private Integer pointUseKcSave;
    private Integer pointSanBoss;
} 