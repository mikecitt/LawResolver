package com.ftn.lawresolverapi.service.interfaces;

import com.ftn.lawresolverapi.dto.CaseDTO;

public interface RuleJudgementService {
    String startJudging(CaseDTO caseDTO);
}
