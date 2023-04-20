package com.ftn.lawresolverapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CaseResultDTO {
    private CaseDTO aCase;
    private double similarity;

    public CaseResultDTO(CaseDTO aCase, double similarity) {
        this.aCase = aCase;
        this.similarity = similarity;
    }
}
