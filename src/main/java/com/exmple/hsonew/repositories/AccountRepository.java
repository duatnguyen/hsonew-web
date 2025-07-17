package com.exmple.hsonew.repositories;

import com.exmple.hsonew.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    // Tìm account theo username (field user trong DB)
    Optional<Account> findByUsername(String username);

    // Tìm account theo email
    Optional<Account> findByEmail(String email);

    Optional<Account> findById(Long accountId);

    // Kiểm tra username đã tồn tại
    boolean existsByUsername(String username);

    // Kiểm tra email đã tồn tại
    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

}