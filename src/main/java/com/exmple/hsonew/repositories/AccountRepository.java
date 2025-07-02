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
    
    // Kiểm tra username đã tồn tại
    boolean existsByUsername(String username);
    
    // Kiểm tra email đã tồn tại  
    boolean existsByEmail(String email);
    
    // Tìm account theo username hoặc email
    @Query("SELECT a FROM Account a WHERE a.username = :loginId OR a.email = :loginId")
    Optional<Account> findByUsernameOrEmail(@Param("loginId") String loginId);
    
    // Tìm account active theo username (status = 1 và lock = 0)
    @Query("SELECT a FROM Account a WHERE a.username = :username AND a.status = 1 AND a.lock = 0")
    Optional<Account> findByUsernameAndActive(@Param("username") String username);
    
    // Tìm account active theo username hoặc email
    @Query("SELECT a FROM Account a WHERE (a.username = :loginId OR a.email = :loginId) AND a.status = 1 AND a.lock = 0")
    Optional<Account> findByUsernameOrEmailAndActive(@Param("loginId") String loginId);
} 