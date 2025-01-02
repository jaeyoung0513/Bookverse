package com.example.bookverse.data.request;

import lombok.Data;

import java.util.List;

@Data
public class RequestListDTO {
    private String email;
    private List<RequestBuyDTO> requestBuyDTOS;
}
