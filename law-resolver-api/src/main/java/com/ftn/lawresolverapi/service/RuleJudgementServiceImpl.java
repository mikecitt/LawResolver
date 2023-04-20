package com.ftn.lawresolverapi.service;

import com.ftn.lawresolverapi.dto.CaseDTO;
import com.ftn.lawresolverapi.model.Case;
import com.ftn.lawresolverapi.service.interfaces.RuleJudgementService;
import org.springframework.stereotype.Service;

@Service
public class RuleJudgementServiceImpl implements RuleJudgementService {
    @Override
    public String startJudging(CaseDTO caseDTO) {
        return null;
    }

    @Override
    public void clean() {

    }
}
