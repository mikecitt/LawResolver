package com.ftn.lawresolverapi.service;

import com.ftn.lawresolverapi.cbr.CsvConnector;
import com.ftn.lawresolverapi.cbr.TabularSimilarity;
import com.ftn.lawresolverapi.dto.CaseDTO;
import com.ftn.lawresolverapi.mapper.CaseMapper;
import com.ftn.lawresolverapi.model.Case;
import com.ftn.lawresolverapi.service.interfaces.CaseJudgementService;
import es.ucm.fdi.gaia.jcolibri.casebase.LinealCaseBase;
import es.ucm.fdi.gaia.jcolibri.cbraplications.StandardCBRApplication;
import es.ucm.fdi.gaia.jcolibri.cbrcore.Attribute;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRCase;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRCaseBase;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRQuery;
import es.ucm.fdi.gaia.jcolibri.exception.ExecutionException;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.NNConfig;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.NNScoringMethod;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.similarity.global.Average;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.similarity.local.Equal;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.NNretrieval.similarity.local.Interval;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.RetrievalResult;
import es.ucm.fdi.gaia.jcolibri.method.retrieve.selection.SelectCases;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CaseJudgementServiceImpl implements CaseJudgementService, StandardCBRApplication {

    private CsvConnector connector;
    private CBRCaseBase caseBase;
    private NNConfig simConfig;
    private CaseMapper caseMapper;

    public CaseJudgementServiceImpl() {
        caseMapper = new CaseMapper();
    }

    @Override
    public List<String> startJudging(CaseDTO caseDTO) {
        Case caseDescription = caseMapper.toEntity(caseDTO);
        List<String> cases = null;
        try {
            configure();
            preCycle();

            CBRQuery query = new CBRQuery();
            query.setDescription( caseDescription );


            cases = fullCycle(query);
            postCycle();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return cases;
    }

    @Override
    public void addNewCase(CaseDTO caseDTO) {
        Case caseDescription = caseMapper.toEntity(caseDTO);
        connector = new CsvConnector();
        List<CBRCase> cases = new LinkedList<>();
        CBRCase cbrCase = new CBRCase();
        cbrCase.setDescription(caseDescription);
        cases.add(cbrCase);
        connector.storeCases(cases);
    }

    @Override
    public void configure() throws ExecutionException {
        connector =  new CsvConnector();

        caseBase = new LinealCaseBase();  // Create a Lineal case base for in-memory organization

        simConfig = new NNConfig(); // KNN configuration
        simConfig.setDescriptionSimFunction(new Average());  // global similarity function = average

        simConfig.addMapping(new Attribute("felony", Case.class), new Equal());
        simConfig.addMapping(new Attribute("judgementType", Case.class), new Equal());
        simConfig.addMapping(new Attribute("gainedMoney", Case.class), new Interval(2000));
        simConfig.addMapping(new Attribute("fine", Case.class), new Interval(5000));
        simConfig.addMapping(new Attribute("prison", Case.class), new Interval(5000));
        TabularSimilarity similarity = new TabularSimilarity(Arrays.asList(
                "cl. 352 st. 3. KZ",
                "cl. 401 st. 2. KZ",
                "cl. 244 st. 4. KZ",
                "cl. 260 st.2",
                "cl. 23 KZ",
                "cl. 49 KZ",
                "cl. 49. st. 1. KZ",
                "cl. 48 st. 1",
                "cl. 23. st. 2",
                "cl. 352 st. 2. KZ",
                "cl. 112",
                "cl. 113 st. 1",
                "cl. 401 st. 3",
                "cl. 352 st. 3. KZ"
        ));
        similarity.setSimilarity("cl. 401 st. 2. KZ", "cl. 401 st. 3", .5);
        similarity.setSimilarity("cl. 49 KZ", "cl. 49. st. 1. KZ", .5);
        similarity.setSimilarity("cl. 49 KZ", "cl. 47 st. 4 ZOBSNP", .5);
        similarity.setSimilarity("cl. 352 st. 3. KZ", "cl. 352 st. 2. KZ", .5);
        simConfig.addMapping(new Attribute("regulations", Case.class), similarity);

        // Equal - returns 1 if both individuals are equal, otherwise returns 0
        // Interval - returns the similarity of two number inside an interval: sim(x,y) = 1-(|x-y|/interval)
        // Threshold - returns 1 if the difference between two numbers is less than a threshold, 0 in the other case
        // EqualsStringIgnoreCase - returns 1 if both String are the same despite case letters, 0 in the other case
        // MaxString - returns a similarity value depending of the biggest substring that belong to both strings
        // EnumDistance - returns the similarity of two enum values as the their distance: sim(x,y) = |ord(x) - ord(y)|
        // EnumCyclicDistance - computes the similarity between two enum values as their cyclic distance
        // Table - uses a table to obtain the similarity between two values. Allowed values are Strings or Enums. The table is read from a text file.
        // TabularSimilarity - calculates similarity between two strings or two lists of strings on the basis of tabular similarities
    }

    public List<String> fullCycle(CBRQuery query) throws ExecutionException {
        Collection<RetrievalResult> eval = NNScoringMethod.evaluateSimilarity(caseBase.getCases(), query, simConfig);
        eval = SelectCases.selectTopKRR(eval, 5);
        List<String> similarCases = new ArrayList<>();
        for (RetrievalResult nse : eval)
            similarCases.add(nse.get_case().getDescription() + ", similarity=" + nse.getEval());
        return similarCases;
    }

    @Override
    public CBRCaseBase preCycle() throws ExecutionException {
        caseBase.init(connector);
        java.util.Collection<CBRCase> cases = caseBase.getCases();
        return caseBase;
    }

    @Override
    public void cycle(CBRQuery query) throws ExecutionException {
        Collection<RetrievalResult> eval = NNScoringMethod.evaluateSimilarity(caseBase.getCases(), query, simConfig);
        eval = SelectCases.selectTopKRR(eval, 5);
        System.out.println("Retrieved cases:");
        for (RetrievalResult nse : eval)
            System.out.println(nse.get_case().getDescription() + " -> " + nse.getEval());
    }

    @Override
    public void postCycle() throws ExecutionException {

    }
}
