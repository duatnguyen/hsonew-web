package com.exmple.hsonew.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "card_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trx_id", nullable = false, length = 50)
    private String trxId;

    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @Column(name = "network", nullable = false, length = 10)
    private String network;

    @Column(name = "card_code", nullable = false, length = 50)
    private String cardCode;

    @Column(name = "card_seri", nullable = false, length = 50)
    private String cardSeri;

    @Column(name = "card_value", nullable = false)
    private Integer cardValue;

    @Column(name = "real_value", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer realValue = 0;

    @Column(name = "status_code", length = 10)
    private String statusCode;

    @Column(name = "status_message", length = 255)
    private String statusMessage;

    @Column(name = "reason", length = 255)
    private String reason;

    @Column(name = "stage")
    private Integer stage;

    @Column(name = "stage_name", length = 255)
    private String stageName;

    @Column(name = "url_callback", nullable = false, length = 255)
    private String urlCallback;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
} 