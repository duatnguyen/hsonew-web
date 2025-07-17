package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.CardTransaction;
import com.exmple.hsonew.repositories.CardTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CardTransactionService {
    @Autowired
    private CardTransactionRepository cardTransactionRepository;

    public CardTransaction save(CardTransaction cardTransaction) {
        return cardTransactionRepository.save(cardTransaction);
    }

    public List<CardTransaction> findAll() {
        return cardTransactionRepository.findAll();
    }

    public Optional<CardTransaction> findById(Long id) {
        return cardTransactionRepository.findById(id);
    }

    public void updateTransactionByTrxId(String trxId, String code, String mess, String reason, Integer value) {
        Optional<CardTransaction> opt = cardTransactionRepository.findByTrxId(trxId);
        if (opt.isPresent()) {
            CardTransaction tx = opt.get();
            tx.setStatusCode(code);
            tx.setStatusMessage(mess);
            tx.setReason(reason);
            if (value != null) tx.setRealValue(value);
            tx.setUpdatedAt(LocalDateTime.now());
            cardTransactionRepository.save(tx);
        }
    }
} 