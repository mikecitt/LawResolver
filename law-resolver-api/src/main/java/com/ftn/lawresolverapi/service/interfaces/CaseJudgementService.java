package com.ftn.lawresolverapi.service.interfaces;

import com.ftn.lawresolverapi.dto.CaseDTO;
import com.ftn.lawresolverapi.dto.CaseResultDTO;

import java.util.List;

public interface CaseJudgementService {
    List<CaseResultDTO> startJudging(CaseDTO caseDTO);
    void addNewCase(CaseDTO caseDTO);
}
