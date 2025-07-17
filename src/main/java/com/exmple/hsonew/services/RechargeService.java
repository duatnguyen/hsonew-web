package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.Recharge;
import com.exmple.hsonew.repositories.RechargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RechargeService {
    @Autowired
    private RechargeRepository rechargeRepository;

    public Recharge save(Recharge napTien) {
        return rechargeRepository.save(napTien);
    }

    public List<Recharge> findAll() {
        return rechargeRepository.findAll();
    }

    public Optional<Recharge> findById(Integer id) {
        return rechargeRepository.findById(id);
    }

    public List<Recharge> findByNamePlayerIn(List<String> namePlayers) {
        return rechargeRepository.findByNamePlayerIn(namePlayers);
    }
}