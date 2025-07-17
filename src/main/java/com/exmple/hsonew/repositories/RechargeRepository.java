package com.exmple.hsonew.repositories;

import com.exmple.hsonew.entities.Recharge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RechargeRepository extends JpaRepository<Recharge, Integer> {
    List<Recharge> findByNamePlayerIn(List<String> namePlayers);
}