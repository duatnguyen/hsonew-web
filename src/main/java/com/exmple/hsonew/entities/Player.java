package com.exmple.hsonew.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "player")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String body;
    private Byte clazz;
    private Byte maxbag;
    @Column(nullable = false)
    private Integer maxbox = 42;
    @Column(nullable = false)
    private Integer maxbagbox = 0;
    private Byte diem_danh;
    private Byte typeexp;
    private Integer level;
    private Long exp;
    private String site;
    private String site_hs;
    @Column(length = 1000)
    private String rms_save;
    @Column(columnDefinition = "TEXT")
    private String friend;
    @Column(columnDefinition = "TEXT")
    private String eff;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String eff_real_time = "[]";
    @Column(columnDefinition = "TEXT")
    private String enemies;
    private String skill;
    @Column(nullable = false, length = 250)
    private String skill_unlocked = "[]";
    @Column(columnDefinition = "LONGTEXT")
    private String item3;
    @Column(length = 1000)
    private String item4;
    @Column(length = 1000)
    private String item5;
    @Column(columnDefinition = "TEXT")
    private String item7;
    @Column(columnDefinition = "LONGTEXT")
    private String itembox3;
    @Column(length = 1000)
    private String itembox4;
    @Column(length = 1000)
    private String itembox5;
    @Column(columnDefinition = "TEXT")
    private String itembox7;
    @Column(columnDefinition = "LONGTEXT")
    private String item_box_bag3;
    @Column(length = 1000)
    private String item_box_bag4;
    @Column(length = 1000)
    private String item_box_bag5;
    @Column(columnDefinition = "TEXT")
    private String item_box_bag7;
    @Column(columnDefinition = "TEXT")
    private String itemwear;
    @Column(columnDefinition = "TEXT")
    private String pet;
    private Long vang;
    private Integer kimcuong;
    private Integer tiemnang;
    private Integer kynang;
    private Integer point1;
    private Integer point2;
    private Integer point3;
    private Integer point4;
    @Column(nullable = false)
    private Integer point_arena = 0;
    @Column(nullable = false)
    private Integer pointPK = 0;
    @Column(nullable = false)
    private Integer point_loi_dai = 0;
    @Column(nullable = false)
    private Integer pointHealth = 30000;
    private Integer point_danh_vong = 0;
    @Column(nullable = false)
    private Integer point_cuop = 0;
    @Column(nullable = false)
    private Integer point_hiep_si = 0;
    @Column(nullable = false)
    private Integer point_buon = 0;
    @Column(nullable = false)
    private Integer point_san_boss = 0;
    @Column(columnDefinition = "TEXT")
    private String giftcode;
    private String date;
    private String medal_create_material;
    @Column(nullable = false)
    private String item_star_material = "[]";
    @Column(nullable = false)
    private String item_giap_sn_material = "[]";
    @Column(nullable = false)
    private Integer point_use_kc = 0;
    @Column(nullable = false)
    private Integer point_nap_kc = 0;
    @Column(nullable = false)
    private Integer point_nap_kc_save = 0;
    @Column(nullable = false)
    private Integer point_use_kc_save = 0;
    private Integer chuc_phuc = 1;
    @Column(nullable = false)
    private Integer count_dungeon = 0;
    @Column(nullable = false)
    private Integer count_attack_mini_boss = 5;
    @Column(nullable = false)
    private Integer count_khu2 = 0;
    private Integer id_name = -1;
    private Long time_block_ktg = 0L;
    @Column(columnDefinition = "TEXT", length = 65535)
    private String destinations_10;
    @Column(columnDefinition = "TEXT", length = 65535)
    private String destinations_33;
    @Column(columnDefinition = "TEXT", length = 65535)
    private String destinations_55;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String quests;
    @Column(nullable = false)
    private Integer chuyen_can = 0;
    private Integer type_use_mount = -1;
    private java.sql.Timestamp last_updated;
}
