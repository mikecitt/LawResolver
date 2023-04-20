package com.ftn.lawresolverapi.controller;

import com.ftn.lawresolverapi.dto.CaseDTO;
import com.ftn.lawresolverapi.dto.SuggestionsDTO;
import com.ftn.lawresolverapi.service.interfaces.CaseJudgementService;
import com.ftn.lawresolverapi.service.interfaces.RuleJudgementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/judge")
public class JudgementController {

    @Autowired
    private CaseJudgementService caseJudgementService;

    @Autowired
    private RuleJudgementService ruleJudgementService;

    @PostMapping()
    ResponseEntity<SuggestionsDTO> startReasoning(@RequestBody CaseDTO caseDTO) {
        SuggestionsDTO reasoningResultDTO = new SuggestionsDTO();
        reasoningResultDTO.setCases(caseJudgementService.startJudging(caseDTO));
        reasoningResultDTO.setRules(ruleJudgementService.startJudging(caseDTO));
        ruleJudgementService.clean();
        return ResponseEntity.ok(reasoningResultDTO);
    }

    @PostMapping("/case")
    ResponseEntity<String> addNewCase(@RequestBody CaseDTO caseDTO) {
        caseJudgementService.addNewCase(caseDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
