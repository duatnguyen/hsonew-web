package com.exmple.hsonew.controllers;

import com.exmple.hsonew.entities.Ranking;
import com.exmple.hsonew.services.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {
    @Autowired
    private RankingService rankingService;

    @GetMapping("")
    public ResponseEntity<List<Ranking>> getAllRankings() {
        return ResponseEntity.ok(rankingService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ranking> getRankingById(@PathVariable Integer id) {
        Optional<Ranking> ranking = rankingService.findById(id);
        return ranking.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<Ranking> createRanking(@RequestBody Ranking ranking) {
        Ranking saved = rankingService.save(ranking);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ranking> updateRanking(@PathVariable Integer id, @RequestBody Ranking ranking) {
        if (!rankingService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        ranking.setId(id);
        Ranking updated = rankingService.save(ranking);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRanking(@PathVariable Integer id) {
        if (!rankingService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        rankingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 