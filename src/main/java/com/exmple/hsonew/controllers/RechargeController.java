package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.RechargeCardRequest;
import com.exmple.hsonew.dtos.response.RechargeCardResponse;
import com.exmple.hsonew.services.RechargeCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/recharge")
public class RechargeController {
    @Autowired
    private RechargeCardService rechargeCardService;

    @PostMapping("/card")
    public ResponseEntity<RechargeCardResponse> rechargeCard(
            @RequestBody RechargeCardRequest request) {
        RechargeCardResponse response = rechargeCardService.rechargeCard(
                request.getNetwork(),
                request.getCardCode(),
                request.getCardSeri(),
                request.getCardValue(),
                request.getUrlCallback(),
                request.getTrxId());
        return ResponseEntity.ok(response);
    }
}