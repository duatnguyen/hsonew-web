package com.exmple.hsonew.dtos.response;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class RechargeCardResponse {
    @JsonProperty("Code")
    private String code; // "1" hoặc "0"

    @JsonProperty("Message")
    private String message; // Thông báo nếu có
}