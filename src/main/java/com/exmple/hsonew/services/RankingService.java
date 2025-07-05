package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.Ranking;
import com.exmple.hsonew.repositories.RankingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RankingService {
    @Autowired
    private RankingRepository rankingRepository;

    public List<Ranking> findAll() {
        return rankingRepository.findAll();
    }

    public Optional<Ranking> findById(Integer id) {
        return rankingRepository.findById(id);
    }

    public Ranking save(Ranking ranking) {
        return rankingRepository.save(ranking);
    }

    public void deleteById(Integer id) {
        rankingRepository.deleteById(id);
    }
} 