package com.ftn.lawresolverapi.cbr;

import java.io.*;
import java.net.URL;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import com.ftn.lawresolverapi.model.Case;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CBRCase;
import es.ucm.fdi.gaia.jcolibri.cbrcore.CaseBaseFilter;
import es.ucm.fdi.gaia.jcolibri.cbrcore.Connector;
import es.ucm.fdi.gaia.jcolibri.exception.InitializingException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.ResourceUtils;

public class CsvConnector implements Connector {

    @Override
    public Collection<CBRCase> retrieveAllCases() {
        LinkedList<CBRCase> cases = new LinkedList<>();

        try {
            File f = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "presude.csv").toFile();
            BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(f)));

            String line = "";
            while ((line = br.readLine()) != null) {
                if (line.startsWith("#") || (line.length() == 0))
                    continue;
                String[] values = line.split(";");

                CBRCase cbrCase = new CBRCase();

                Case caseDescription = new Case();
                caseDescription.setId(Integer.parseInt(values[0]));
                caseDescription.setCourt(values[1]);
                caseDescription.setCaseNumber(values[2]);
                caseDescription.setJudge(values[3]);
                caseDescription.setProsecutor(values[4]);
                caseDescription.setDefendant(values[5]);
                caseDescription.setFelony(values[6]);
                caseDescription.setJudgementType(values[7]);
                caseDescription.setFine(Double.parseDouble(values[8]));
                caseDescription.setPrison(Integer.parseInt(values[9]));
                caseDescription.setRegulations(Arrays.asList(values[10].split(",")));

                cbrCase.setDescription(caseDescription);
                cases.add(cbrCase);
            }
            br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return cases;
    }

    @Override
    public Collection<CBRCase> retrieveSomeCases(CaseBaseFilter arg0) {
        return null;
    }

    @Override
    public void storeCases(Collection<CBRCase> collection) {
        File f = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "presude.csv").toFile();

        List<Case> cases = retrieveAllCases().stream().map(x -> (Case)x.getDescription()).toList();
        int maxId = cases.stream().max(Comparator.comparingInt(Case::getId)).get().getId() + 1;
        try(PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(f, true))))
        {
            for (CBRCase cbrCase: collection) {
                Case caseDescription = (Case) cbrCase.getDescription();
                caseDescription.setId(maxId);
                String s = caseDescription.getId() + ";"
                        + caseDescription.getCourt() + ";"
                        + caseDescription.getCaseNumber() + ";"
                        + caseDescription.getJudge() + ";"
                        + caseDescription.getProsecutor() + ";"
                        + caseDescription.getDefendant() + ";"
                        + caseDescription.getFelony() + ";"
                        + caseDescription.getJudgementType() + ";"
                        + caseDescription.getFine() + ";"
                        + caseDescription.getPrison() + ";"
                        + String.join(",", caseDescription.getRegulations())
                        + "\n";
                out.print(s);
                out.flush();
                maxId++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close() {
    }

    @Override
    public void deleteCases(Collection<CBRCase> arg0) {
    }

    @Override
    public void initFromXMLfile(URL arg0) throws InitializingException {
    }

}
