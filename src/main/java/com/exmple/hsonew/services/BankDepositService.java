package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.BankDeposit;
import com.exmple.hsonew.repositories.BankDepositRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BankDepositService {
    @Autowired
    private BankDepositRepository bankDepositRepository;

    public List<BankDeposit> findAll() {
        return bankDepositRepository.findAll();
    }

    public Optional<BankDeposit> findById(Integer id) {
        return bankDepositRepository.findById(id);
    }

    public BankDeposit save(BankDeposit deposit) {
        return bankDepositRepository.save(deposit);
    }

    public void deleteById(Integer id) {
        bankDepositRepository.deleteById(id);
    }
} 