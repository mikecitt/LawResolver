package com.ftn.lawresolverapi.mapper;

import com.ftn.lawresolverapi.dto.CaseDTO;
import com.ftn.lawresolverapi.model.Case;

public class CaseMapper {
    public Case toEntity(CaseDTO caseDTO) {
        Case caseDescription = new Case();
        caseDescription.setCourt(caseDTO.getCourt());
        caseDescription.setCaseNumber(caseDTO.getCaseNumber());
        caseDescription.setJudge(caseDTO.getJudge());
        caseDescription.setProsecutor(caseDTO.getProsecutor());
        caseDescription.setDefendant(caseDTO.getDefendant());
        caseDescription.setFelony(caseDTO.getFelony());
        caseDescription.setJudgementType(caseDTO.getJudgementType());
        caseDescription.setGainedMoney(caseDTO.getGainedMoney());
        caseDescription.setFine(caseDTO.getFine());
        caseDescription.setPrison(caseDTO.getPrison());
        caseDescription.setRegulations(caseDTO.getRegulations());

        return caseDescription;
    }
}
