package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.response.PlayerRankingResponse;
import com.exmple.hsonew.entities.Player;
import com.exmple.hsonew.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {
    @Autowired
    private PlayerService playerService;

    @GetMapping("/pointSanBoss")
    public ResponseEntity<List<PlayerRankingResponse>> getRankingByPointSanBoss() {
        return ResponseEntity.ok(playerService.findAllOrderByPointSanBossDesc());
    }

    @GetMapping("/pointNapSave")
    public ResponseEntity<List<PlayerRankingResponse>> getRankingByPointNapKcSave() {
        return ResponseEntity.ok(playerService.findAllOrderByPointNapKcSaveDesc());
    }

    @GetMapping("/caothu")
    public ResponseEntity<List<PlayerRankingResponse>> getRankingByLevel() {
        return ResponseEntity.ok(playerService.findAllOrderByLevelDesc());
    }

    @GetMapping("")
    public ResponseEntity<?> getTop10ForDefaultFields() {
        return ResponseEntity.ok(playerService.getTop10ForDefaultFields());
    }
}