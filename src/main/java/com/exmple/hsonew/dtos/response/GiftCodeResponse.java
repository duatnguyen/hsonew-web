package com.exmple.hsonew.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GiftCodeResponse extends BaseResponse {
    private GiftCodeData giftCode;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GiftCodeData {
        private Integer id;
        private String giftname;
        private List<GiftCodeItemDetail> items;
        private Long vang;
        private Integer ngoc;
        private Integer limitUse;
        private LocalDateTime endTime;
    }
} 