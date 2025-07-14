package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.Player;
import com.exmple.hsonew.repositories.RankingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService {
    @Autowired
    private RankingRepository rankingRepository;

    public List<Player> findAllOrderByPointSanBossDesc() {
        return rankingRepository.findAllOrderByPointSanBossDesc();
    }

    public List<Player> findAllOrderByPointNapKcSaveDesc() {
        return rankingRepository.findAllOrderByPointNapKcSaveDesc();
    }
} 