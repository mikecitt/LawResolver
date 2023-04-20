package com.ftn.lawresolverapi.service.interfaces;

import com.ftn.lawresolverapi.dto.CaseDTO;

import java.util.List;

public interface CaseJudgementService {
    List<String> startJudging(CaseDTO caseDTO);
    void addNewCase(CaseDTO caseDTO);
}
