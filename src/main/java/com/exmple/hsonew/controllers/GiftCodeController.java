package com.exmple.hsonew.controllers;

import com.exmple.hsonew.dtos.request.GiftCodeRequest;
import com.exmple.hsonew.dtos.response.GiftCodeResponse;
import com.exmple.hsonew.services.GiftCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/giftcodes")
public class GiftCodeController {
    
    @Autowired
    private GiftCodeService giftCodeService;

    @GetMapping
    public ResponseEntity<?> getAllGiftCodes() {
        try {
            List<GiftCodeResponse.GiftCodeData> list = giftCodeService.findAll();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                GiftCodeResponse.builder()
                    .success(false)
                    .message("Lỗi lấy danh sách giftcode: " + e.getMessage())
                    .build()
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GiftCodeResponse> getGiftCodeById(@PathVariable Integer id) {
        try {
            Optional<GiftCodeResponse.GiftCodeData> giftCode = giftCodeService.findById(id);
            if (giftCode.isPresent()) {
                return ResponseEntity.ok(GiftCodeResponse.builder()
                        .success(true)
                        .message("Lấy giftcode thành công")
                        .giftCode(giftCode.get())
                        .build());
            } else {
                return ResponseEntity.status(404).body(GiftCodeResponse.builder()
                        .success(false)
                        .message("GiftCode không tồn tại")
                        .build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(GiftCodeResponse.builder()
                    .success(false)
                    .message("Lỗi lấy giftcode: " + e.getMessage())
                    .build());
        }
    }

    @PostMapping("")
    public ResponseEntity<GiftCodeResponse> createGiftCode(@RequestBody GiftCodeRequest request) {
        try {
            GiftCodeResponse.GiftCodeData saved = giftCodeService.create(request);
            return ResponseEntity.ok(GiftCodeResponse.builder()
                    .success(true)
                    .message("Tạo giftcode thành công")
                    .giftCode(saved)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(GiftCodeResponse.builder()
                    .success(false)
                    .message("Lỗi tạo giftcode: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<GiftCodeResponse> updateGiftCode(@PathVariable Integer id, @RequestBody GiftCodeRequest request) {
        try {
            Optional<GiftCodeResponse.GiftCodeData> updated = giftCodeService.update(id, request);
            if (updated.isPresent()) {
                return ResponseEntity.ok(GiftCodeResponse.builder()
                        .success(true)
                        .message("Cập nhật giftcode thành công")
                        .giftCode(updated.get())
                        .build());
            } else {
                return ResponseEntity.status(404).body(GiftCodeResponse.builder()
                        .success(false)
                        .message("GiftCode không tồn tại")
                        .build());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(GiftCodeResponse.builder()
                    .success(false)
                    .message("Lỗi cập nhật giftcode: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GiftCodeResponse> deleteGiftCode(@PathVariable Integer id) {
        try {
            Optional<GiftCodeResponse.GiftCodeData> giftCode = giftCodeService.findById(id);
            if (!giftCode.isPresent()) {
                return ResponseEntity.status(404).body(GiftCodeResponse.builder()
                        .success(false)
                        .message("GiftCode không tồn tại")
                        .build());
            }
            giftCodeService.deleteById(id);
            return ResponseEntity.ok(GiftCodeResponse.builder()
                    .success(true)
                    .message("Xóa giftcode thành công")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(GiftCodeResponse.builder()
                    .success(false)
                    .message("Lỗi xóa giftcode: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/expired")
    public ResponseEntity<?> getExpiredGiftCodes() {
        try {
            List<GiftCodeResponse.GiftCodeData> list = giftCodeService.findExpired();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                GiftCodeResponse.builder()
                    .success(false)
                    .message("Lỗi lấy danh sách giftcode đã hết hạn: " + e.getMessage())
                    .build()
            );
        }
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveGiftCodes() {
        try {
            List<GiftCodeResponse.GiftCodeData> list = giftCodeService.findActive();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                GiftCodeResponse.builder()
                    .success(false)
                    .message("Lỗi lấy danh sách giftcode chưa hết hạn: " + e.getMessage())
                    .build()
            );
        }
    }
} 