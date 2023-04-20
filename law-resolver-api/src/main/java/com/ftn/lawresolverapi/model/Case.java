package com.ftn.lawresolverapi.model;

import es.ucm.fdi.gaia.jcolibri.cbrcore.Attribute;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CaseComponent;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Case implements CaseComponent {
    private int id;
    private String court;
    private String caseNumber;
    private String judge;
    private String prosecutor;
    private String defendant;
    private String felony;
    private String judgementType;
    private double gainedMoney;
    private double fine;
    private int prison;
    private List<String> regulations;

    @Override
    public String toString() {
        return "CaseDescription [id=" + id + ", court=" + court + ", caseNumber=" + caseNumber + ", judge=" + judge
                + ", prosecutor=" + prosecutor + ", defendant=" + defendant + ", felony=" + felony
                + ", judgementType=" + judgementType + ", gainedMoney=" + gainedMoney + ", fine=" + fine + ", prison="
                + prison + ", regulations=" + regulations + "]";
    }

    @Override
    public Attribute getIdAttribute() {
        return new Attribute("id", this.getClass());
    }
}
