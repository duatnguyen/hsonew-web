package com.exmple.hsonew.repositories;

import com.exmple.hsonew.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    @Query("SELECT p FROM Player p ORDER BY p.point_san_boss DESC")
    List<Player> findAllOrderByPointSanBossDesc();

    @Query("SELECT p FROM Player p ORDER BY p.point_nap_kc_save DESC")
    List<Player> findAllOrderByPointNapKcSaveDesc();

    @Query("SELECT p FROM Player p ORDER BY p.level DESC")
    List<Player> findAllOrderByLevelDesc();

    // // Thêm các method top 10 cho API tổng quát
    // List<Player> findTop10ByOrderByLevelDesc();
    // List<Player> findTop10ByOrderByPointSanBossDesc();
    // List<Player> findTop10ByOrderByPointNapKcSaveDesc();
    // List<Player> findTop10ByOrderByPointUseKcSaveDesc();
    // List<Player> findTop10ByOrderByPointArenaDesc();
    // List<Player> findTop10ByOrderByPointDanhVongDesc();
    
    List<Player> findAll();
    Player findByName(String name);
}
