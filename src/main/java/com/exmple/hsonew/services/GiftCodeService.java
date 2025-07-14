package com.exmple.hsonew.services;

import com.exmple.hsonew.dtos.request.GiftCodeRequest;
import com.exmple.hsonew.dtos.response.GiftCodeResponse;
import com.exmple.hsonew.dtos.response.GiftCodeItemDetail;
import com.exmple.hsonew.entities.GiftCode;
import com.exmple.hsonew.entities.Item3;
import com.exmple.hsonew.entities.Item4;
import com.exmple.hsonew.entities.Item7;
import com.exmple.hsonew.repositories.GiftCodeRepository;
import com.exmple.hsonew.repositories.Item3Repository;
import com.exmple.hsonew.repositories.Item4Repository;
import com.exmple.hsonew.repositories.Item7Repository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GiftCodeService {
    @Autowired
    private GiftCodeRepository giftCodeRepository;
    @Autowired
    private Item3Repository item3Repository;
    @Autowired
    private Item4Repository item4Repository;
    @Autowired
    private Item7Repository item7Repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<GiftCodeResponse.GiftCodeData> findAll() {
        return giftCodeRepository.findAll().stream()
                .map(this::toGiftCodeResponse)
                .collect(Collectors.toList());
    }

    public Optional<GiftCodeResponse.GiftCodeData> findById(Integer id) {
        return giftCodeRepository.findById(id).map(this::toGiftCodeResponse);
    }

    public GiftCodeResponse.GiftCodeData create(GiftCodeRequest request) {
        GiftCode giftCode = fromRequestToEntity(request);
        GiftCode saved = giftCodeRepository.save(giftCode);
        return toGiftCodeResponse(saved);
    }

    public Optional<GiftCodeResponse.GiftCodeData> update(Integer id, GiftCodeRequest request) {
        return giftCodeRepository.findById(id).map(existing -> {
            updateEntityFromRequest(existing, request);
            GiftCode updated = giftCodeRepository.save(existing);
            return toGiftCodeResponse(updated);
        });
    }

    public void deleteById(Integer id) {
        giftCodeRepository.deleteById(id);
    }

    public List<GiftCodeResponse.GiftCodeData> findExpired() {
        LocalDateTime now = LocalDateTime.now();
        return giftCodeRepository.findAll().stream()
                .filter(g -> g.getEndTime() != null && g.getEndTime().isBefore(now))
                .map(this::toGiftCodeResponse)
                .collect(Collectors.toList());
    }

    public List<GiftCodeResponse.GiftCodeData> findActive() {
        LocalDateTime now = LocalDateTime.now();
        return giftCodeRepository.findAll().stream()
                .filter(g -> g.getEndTime() == null || g.getEndTime().isAfter(now))
                .map(this::toGiftCodeResponse)
                .collect(Collectors.toList());
    }

    // Chuyển đổi entity sang response DTO
    private GiftCodeResponse.GiftCodeData toGiftCodeResponse(GiftCode giftCode) {
        List<GiftCodeItemDetail> item3List = parseItemList(giftCode.getItem3(), item3Repository);
        List<GiftCodeItemDetail> item4List = parseItemList(giftCode.getItem4(), item4Repository);
        List<GiftCodeItemDetail> item7List = parseItemList(giftCode.getItem7(), item7Repository);
        List<GiftCodeItemDetail> allItems = new java.util.ArrayList<>();
        allItems.addAll(item3List);
        allItems.addAll(item4List);
        allItems.addAll(item7List);
        return new GiftCodeResponse.GiftCodeData(
                giftCode.getId(),
                giftCode.getGiftname(),
                allItems,
                giftCode.getVang(),
                giftCode.getNgoc(),
                giftCode.getLimitUse(),
                giftCode.getEndTime()
        );
    }

    private <T> List<GiftCodeItemDetail> parseItemList(String json, org.springframework.data.jpa.repository.JpaRepository<T, Integer> repo) {
        try {
            if (json == null || json.isEmpty()) return List.of();
            List<List<Integer>> arr = objectMapper.readValue(json, new TypeReference<List<List<Integer>>>(){});
            return arr.stream().map(pair -> {
                Integer id = pair.get(0);
                Integer quantity = pair.size() > 1 ? pair.get(1) : 1;
                String name = "";
                if (repo instanceof Item3Repository) {
                    name = ((Item3Repository) repo).findById(id).map(Item3::getName).orElse("");
                } else if (repo instanceof Item4Repository) {
                    name = ((Item4Repository) repo).findById(id).map(Item4::getName).orElse("");
                } else if (repo instanceof Item7Repository) {
                    name = ((Item7Repository) repo).findById(id).map(Item7::getName).orElse("");
                }
                return new GiftCodeItemDetail(id, name, quantity);
            }).toList();
        } catch (Exception e) {
            return List.of();
        }
    }

    // Chuyển đổi request DTO sang entity
    private GiftCode fromRequestToEntity(GiftCodeRequest request) {
        GiftCode giftCode = new GiftCode();
        updateEntityFromRequest(giftCode, request);
        return giftCode;
    }

    // Cập nhật entity từ request DTO
    private void updateEntityFromRequest(GiftCode giftCode, GiftCodeRequest request) {
        giftCode.setGiftname(request.getGiftname());
        giftCode.setItem3(request.getItem3());
        giftCode.setItem4(request.getItem4());
        giftCode.setItem7(request.getItem7());
        giftCode.setItem47random(request.getItem47random());
        giftCode.setCountrandom(request.getCountrandom());
        giftCode.setVang(request.getVang());
        giftCode.setNgoc(request.getNgoc());
        giftCode.setEmptyBox(request.getEmptyBox());
        giftCode.setMessage(request.getMessage());
        giftCode.setLimit(request.getLimit());
        giftCode.setLimitUse(request.getLimitUse());
        giftCode.setStartTime(request.getStartTime());
        giftCode.setEndTime(request.getEndTime());
    }
} 