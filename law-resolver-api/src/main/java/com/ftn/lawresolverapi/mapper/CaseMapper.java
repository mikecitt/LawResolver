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

    public CaseDTO toDto(Case _case) {
        CaseDTO caseDTO = new CaseDTO();
        caseDTO.setId(_case.getId());
        caseDTO.setCourt(_case.getCourt());
        caseDTO.setCaseNumber(_case.getCaseNumber());
        caseDTO.setJudge(_case.getJudge());
        caseDTO.setProsecutor(_case.getProsecutor());
        caseDTO.setDefendant(_case.getDefendant());
        caseDTO.setFelony(_case.getFelony());
        caseDTO.setJudgementType(_case.getJudgementType());
        caseDTO.setGainedMoney(_case.getGainedMoney());
        caseDTO.setFine(_case.getFine());
        caseDTO.setPrison(_case.getPrison());
        caseDTO.setRegulations(_case.getRegulations());

        return caseDTO;
    }
}
