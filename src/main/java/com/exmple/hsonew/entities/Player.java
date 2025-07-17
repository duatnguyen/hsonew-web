package com.exmple.hsonew.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "player")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "body")
    private String body;

    @Column(name = "clazz")
    private Byte clazz;

    @Column(name = "maxbag")
    private Byte maxbag;

    @Column(name = "maxbox", nullable = false)
    private Integer maxbox = 42;

    @Column(name = "maxbagbox", nullable = false)
    private Integer maxbagbox = 0;

    @Column(name = "diem_danh")
    private Byte diem_danh;

    @Column(name = "typeexp")
    private Byte typeexp;

    @Column(name = "level")
    private Integer level;

    @Column(name = "exp")
    private Long exp;

    @Column(name = "site")
    private String site;

    @Column(name = "site_hs")
    private String site_hs;

    @Column(name = "rms_save", length = 1000)
    private String rms_save;

    @Column(name = "friend", columnDefinition = "TEXT")
    private String friend;

    @Column(name = "eff", columnDefinition = "TEXT")
    private String eff;

    @Column(name = "eff_real_time", nullable = false, columnDefinition = "TEXT")
    private String eff_real_time = "[]";

    @Column(name = "enemies", columnDefinition = "TEXT")
    private String enemies;

    @Column(name = "skill")
    private String skill;

    @Column(name = "skill_unlocked", nullable = false, length = 250)
    private String skill_unlocked = "[]";

    @Column(name = "item3", columnDefinition = "LONGTEXT")
    private String item3;

    @Column(name = "item4", length = 1000)
    private String item4;

    @Column(name = "item5", length = 1000)
    private String item5;

    @Column(name = "item7", columnDefinition = "TEXT")
    private String item7;

    @Column(name = "itembox3", columnDefinition = "LONGTEXT")
    private String itembox3;

    @Column(name = "itembox4", length = 1000)
    private String itembox4;

    @Column(name = "itembox5", length = 1000)
    private String itembox5;

    @Column(name = "itembox7", columnDefinition = "TEXT")
    private String itembox7;

    @Column(name = "item_box_bag3", columnDefinition = "LONGTEXT")
    private String item_box_bag3;

    @Column(name = "item_box_bag4", length = 1000)
    private String item_box_bag4;

    @Column(name = "item_box_bag5", length = 1000)
    private String item_box_bag5;

    @Column(name = "item_box_bag7", columnDefinition = "TEXT")
    private String item_box_bag7;

    @Column(name = "itemwear", columnDefinition = "TEXT")
    private String itemwear;

    @Column(name = "pet", columnDefinition = "TEXT")
    private String pet;

    @Column(name = "vang")
    private Long vang;

    @Column(name = "kimcuong")
    private Integer kimcuong;

    @Column(name = "tiemnang")
    private Integer tiemnang;

    @Column(name = "kynang")
    private Integer kynang;

    @Column(name = "point1")
    private Integer point1;

    @Column(name = "point2")
    private Integer point2;

    @Column(name = "point3")
    private Integer point3;

    @Column(name = "point4")
    private Integer point4;

    @Column(name = "point_arena", nullable = false)
    private Integer point_arena = 0;

    @Column(name = "pointPK", nullable = false)
    private Integer pointPK = 0;

    @Column(name = "point_loi_dai", nullable = false)
    private Integer point_loi_dai = 0;

    @Column(name = "point_health", nullable = false)
    private Integer pointHealth = 30000;

    @Column(name = "point_danh_vong")
    private Integer point_danh_vong = 0;

    @Column(name = "point_cuop", nullable = false)
    private Integer point_cuop = 0;

    @Column(name = "point_hiep_si", nullable = false)
    private Integer point_hiep_si = 0;

    @Column(name = "point_buon", nullable = false)
    private Integer point_buon = 0;

    @Column(name = "point_san_boss", nullable = false)
    private Integer point_san_boss = 0;

    @Column(name = "giftcode", columnDefinition = "TEXT")
    private String giftcode;

    @Column(name = "date")
    private String date;

    @Column(name = "medal_create_material")
    private String medal_create_material;

    @Column(name = "item_star_material", nullable = false)
    private String item_star_material = "[]";

    @Column(name = "item_giap_sn_material", nullable = false)
    private String item_giap_sn_material = "[]";

    @Column(name = "point_use_kc", nullable = false)
    private Integer point_use_kc = 0;

    @Column(name = "point_nap_kc", nullable = false)
    private Integer point_nap_kc = 0;

    @Column(name = "point_nap_kc_save", nullable = false)
    private Integer point_nap_kc_save = 0;

    @Column(name = "point_use_kc_save", nullable = false)
    private Integer point_use_kc_save = 0;

    @Column(name = "chuc_phuc")
    private Integer chuc_phuc = 1;

    @Column(name = "count_dungeon", nullable = false)
    private Integer count_dungeon = 0;

    @Column(name = "count_attack_mini_boss", nullable = false)
    private Integer count_attack_mini_boss = 5;

    @Column(name = "count_khu2", nullable = false)
    private Integer count_khu2 = 0;

    @Column(name = "id_name")
    private Integer id_name = -1;

    @Column(name = "time_block_ktg")
    private Long time_block_ktg = 0L;

    @Column(name = "destinations_10", columnDefinition = "TEXT", length = 65535)
    private String destinations_10;

    @Column(name = "destinations_33", columnDefinition = "TEXT", length = 65535)
    private String destinations_33;

    @Column(name = "destinations_55", columnDefinition = "TEXT", length = 65535)
    private String destinations_55;

    @Column(name = "quests", nullable = false, columnDefinition = "TEXT")
    private String quests;

    @Column(name = "chuyen_can", nullable = false)
    private Integer chuyen_can = 0;

    @Column(name = "type_use_mount")
    private Integer type_use_mount = -1;

    @Column(name = "last_updated")
    private java.sql.Timestamp last_updated;
}