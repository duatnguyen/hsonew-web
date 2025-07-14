package com.exmple.hsonew.dtos.request;

import lombok.Data;

@Data
public class RechargeCardRequest {
    private String network; // VTT, VMS, VNP, VNM, GATE, ZING
    private String cardCode;
    private String cardSeri;
    private int cardValue;
    private String urlCallback;
    private String trxId;
} 