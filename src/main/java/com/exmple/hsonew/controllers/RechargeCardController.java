package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.RechargeCardRequest;
import com.exmple.hsonew.dtos.response.RechargeCardResponse;
import com.exmple.hsonew.entities.Recharge;
import com.exmple.hsonew.services.RechargeCardService;
import com.exmple.hsonew.services.RechargeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.exmple.hsonew.entities.CardTransaction;
import com.exmple.hsonew.repositories.CardTransactionRepository;
import com.exmple.hsonew.services.CardTransactionService;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/rechargeCard")
public class RechargeCardController {
    @Autowired
    private RechargeCardService rechargeCardService;
    private RechargeService rechargeService;

    @Autowired
    private static CardTransactionService cardTransactionService; // inject qua context nếu cần

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

    @GetMapping("/card-callback")
    public ResponseEntity<String> cardCallback(
            @RequestParam("Code") String code,
            @RequestParam("Mess") String mess,
            @RequestParam(value = "Reason", required = false) String reason,
            @RequestParam("TrxID") String trxId,
            @RequestParam(value = "CardValue", required = false) Integer cardValue) {
        cardTransactionService.updateTransactionByTrxId(trxId, code, mess, reason, cardValue);
        return ResponseEntity.ok("OK");
    }
}