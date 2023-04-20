package com.ftn.lawresolverapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SuggestionsDTO {
    public List<CaseResultDTO> cases;
    public String rules;

    public SuggestionsDTO() {
        cases = new ArrayList<>();
        rules = "Nema preporuka";
    }
}
