package com.exmple.hsonew.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import com.exmple.hsonew.services.PlayerService;
import com.exmple.hsonew.dtos.response.PlayerRankingResponse;

@RestController
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/api/player/find-by-name")
    public ResponseEntity<?> findByName(@RequestParam String name) {
        PlayerRankingResponse player = playerService.findByName(name);
        if (player == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(player);
    }
}
