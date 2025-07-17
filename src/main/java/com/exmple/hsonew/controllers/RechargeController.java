package com.exmple.hsonew.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.exmple.hsonew.entities.Recharge;
import com.exmple.hsonew.services.RechargeService;

@Controller
@RequestMapping("/api/recharge")
public class RechargeController {

    @Autowired
    private RechargeService rechargeService;

    @GetMapping("")
    public ResponseEntity<List<Recharge>> getAllRecharge() {
        List<Recharge> list = rechargeService.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/search-by-names")
    public ResponseEntity<List<Recharge>> findByNamePlayers(@RequestBody List<String> namePlayers) {
        List<Recharge> result = rechargeService.findByNamePlayerIn(namePlayers);
        return ResponseEntity.ok(result);
    }

    @PostMapping("")
    public ResponseEntity<Recharge> createRecharge(@RequestBody Recharge recharge) {
        Recharge saved = rechargeService.save(recharge);
        return ResponseEntity.ok(saved);
    }
}
