package com.exmple.hsonew.repositories;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exmple.hsonew.entities.JwtBlacklist;

@Repository
public interface JwtBlacklistRepository extends JpaRepository<JwtBlacklist, Long> {
    boolean existsByToken(String token);

    void deleteByExpiryDateBefore(Date expiryDate);
}
