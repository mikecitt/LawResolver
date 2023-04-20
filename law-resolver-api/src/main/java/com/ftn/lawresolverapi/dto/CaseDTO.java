package com.ftn.lawresolverapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CaseDTO {
    private int id;
    private String court;
    private String caseNumber;
    private String judge;
    private String prosecutor;
    private String defendant;
    private String felony;
    private String judgementType;
    private double fine;
    private int prison;
    private List<String> regulations;
}
