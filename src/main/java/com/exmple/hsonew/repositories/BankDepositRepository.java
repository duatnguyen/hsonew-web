package com.exmple.hsonew.repositories;

import com.exmple.hsonew.entities.BankDeposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankDepositRepository extends JpaRepository<BankDeposit, Integer> {
} 