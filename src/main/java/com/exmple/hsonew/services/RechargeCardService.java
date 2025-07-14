package com.exmple.hsonew.services;

import com.exmple.hsonew.dtos.response.RechargeCardResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.client.RestTemplate;

@Service
public class RechargeCardService {
    private static final String API_URL = "http://muabanthe.top/API/NapThe";
    private static final String API_KEY = "4b7dd7b6-b573-46ee-9166-48f8439eb26e";

    public RechargeCardResponse rechargeCard(String network, String cardCode, String cardSeri, int cardValue,
            String urlCallback, String trxId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("APIKey", API_KEY)
                .queryParam("Network", network)
                .queryParam("CardCode", cardCode)
                .queryParam("CardSeri", cardSeri)
                .queryParam("CardValue", cardValue)
                .queryParam("URLCallback", urlCallback)
                .queryParam("TrxID", trxId)
                .toUriString();
        try {
            return restTemplate.getForObject(url, RechargeCardResponse.class);
        } catch (Exception e) {
            RechargeCardResponse error = new RechargeCardResponse();
            error.setCode("0");
            error.setMessage("Lỗi kết nối hoặc API trả về không hợp lệ: " + e.getMessage());
            return error;
        }
    }
}