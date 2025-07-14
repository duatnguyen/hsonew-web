package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.Player;
import com.exmple.hsonew.repositories.PlayerRepository;
import com.exmple.hsonew.dtos.response.PlayerRankingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    private PlayerRankingResponse mapToDto(Player player) {
        return new PlayerRankingResponse(
            player.getName(),
            player.getClazz(),
            player.getLevel(),
            player.getKimcuong(),
            player.getVang(),
            player.getPoint_arena(),
            player.getPoint_danh_vong(),
            player.getPoint_nap_kc_save(),
            player.getPoint_use_kc_save(),
            player.getPoint_san_boss()
        );
    }

    public List<PlayerRankingResponse> findAllOrderByPointSanBossDesc() {
        return playerRepository.findAllOrderByPointSanBossDesc()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<PlayerRankingResponse> findAllOrderByPointNapKcSaveDesc() {
        return playerRepository.findAllOrderByPointNapKcSaveDesc()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<PlayerRankingResponse> findAllOrderByLevelDesc() {
        return playerRepository.findAllOrderByLevelDesc()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public PlayerRankingResponse findByName(String name) {
        Player player = playerRepository.findByName(name);
        if (player == null) return null;
        return mapToDto(player);
    }

    // // --- API tổng quát ---
    // public List<Player> findTop10ByOrderByFieldDesc(String field) {
    //     // Chỉ cho phép các field hợp lệ để tránh SQL injection
    //     switch (field) {
    //         case "level":
    //             return playerRepository.findTop10ByOrderByLevelDesc();
    //         case "point_san_boss":
    //             return playerRepository.findTop10ByOrderByPointSanBossDesc();
    //         case "point_nap_kc_save":
    //             return playerRepository.findTop10ByOrderByPointNapKcSaveDesc();
    //         case "point_use_kc_save":
    //             return playerRepository.findTop10ByOrderByPointUseKcSaveDesc();
    //         case "point_arena":
    //             return playerRepository.findTop10ByOrderByPointArenaDesc();
    //         case "point_danh_vong":
    //             return playerRepository.findTop10ByOrderByPointDanhVongDesc();
    //         default:
    //             return Collections.emptyList();
    //     }
    // }

    // public Object getFieldValue(Player player, String field) {
    //     try {
    //         Field f = Player.class.getDeclaredField(field);
    //         f.setAccessible(true);
    //         return f.get(player);
    //     } catch (Exception e) {
    //         return null;
    //     }
    // }

    public Map<String, List<PlayerRankingResponse>> getTop10ForDefaultFields() {
        List<Player> allPlayers = playerRepository.findAll();
        String[] fields = {
            "level",
            "point_san_boss",
            "point_nap_kc_save",
            "point_use_kc_save",
            "point_arena",
            "point_danh_vong"
        };
        Map<String, List<PlayerRankingResponse>> result = new HashMap<>();

        for (String field : fields) {
            List<Player> sorted = new ArrayList<>(allPlayers);
            sorted.sort((a, b) -> {
                try {
                    Field f = Player.class.getDeclaredField(field);
                    f.setAccessible(true);
                    Comparable v1 = (Comparable) f.get(b);
                    Comparable v2 = (Comparable) f.get(a);
                    return v1.compareTo(v2);
                } catch (Exception e) {
                    return 0;
                }
            });
            List<PlayerRankingResponse> top10 = sorted.stream()
                .limit(10)
                .map(this::mapToDto)
                .collect(Collectors.toList());
            result.put(field, top10);
        }
        return result;
    }
}
