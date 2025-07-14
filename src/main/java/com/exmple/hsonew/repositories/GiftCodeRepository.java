package com.exmple.hsonew.repositories;

import com.exmple.hsonew.entities.GiftCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftCodeRepository extends JpaRepository<GiftCode, Integer> {
} 