package com.ftn.lawresolverapi.service;

import com.ftn.lawresolverapi.dto.CaseDTO;
import com.ftn.lawresolverapi.mapper.CaseMapper;
import com.ftn.lawresolverapi.model.Case;
import com.ftn.lawresolverapi.service.interfaces.RuleJudgementService;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class RuleJudgementServiceImpl implements RuleJudgementService {

    private CaseMapper caseMapper;

    public RuleJudgementServiceImpl() {
        caseMapper = new CaseMapper();
    }
    private void runScript(Path scriptPath, Path directoryPath) {
        ProcessBuilder pb = new ProcessBuilder(scriptPath.toString());
        pb.directory(directoryPath.toFile());
        try {
            Process process = pb.start();
            int exitCode = process.waitFor();
            System.out.println("Rule judgement exited with: " + exitCode);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private void writeFacts(Case caseDescription) {
        File f = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "dr-device", "facts.rdf").toFile();
        try(PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(f))))
        {
            String s = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
                    "<rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n" +
                    "        xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n" +
                    "        xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\"\n" +
                    "        xmlns:lc=\"http://informatika.ftn.uns.ac.rs/legal-case.rdf#\">\n" +
                    "    <lc:case rdf:about=\"http://informatika.ftn.uns.ac.rs/legal-case.rdf#case01\">\n" +
                    "        <lc:name>" + caseDescription.getCaseNumber() + "</lc:name>\n" +
                    "        <lc:defendant>" + caseDescription.getDefendant() + "</lc:defendant>\n" +
                    "        <lc:amount rdf:datatype=\"http://www.w3.org/2001/XMLSchema#decimal\">" + caseDescription.getGainedMoney() + "</lc:amount>\n" +
                    "    </lc:case>\n" +
                    "</rdf:RDF>";
            out.print(s);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String getResults() throws Exception {
        Path exportPath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "dr-device", "export.rdf");

        StringBuilder retVal = new StringBuilder();
        File f = exportPath.toFile();
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);
        DocumentBuilder documentBuilder = factory.newDocumentBuilder();
        Document document = documentBuilder.parse(f);
        Node n = document.getChildNodes().item(1);
        NodeList nodeList = n.getChildNodes();

        boolean prefAdded = false;
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            if (node.getNodeName().contains("export") && node.getTextContent().contains("defeasibly-proven-positive")) {
                String nodeName = node.getNodeName().split(":")[1];
                switch (nodeName) {
                    case "acquire_money_lv1" ->
                            retVal.append("Ovaj slučaj spada pod član 352, tačnije pod stavkom 1. krivičnog zakonika. ");
                    case "acquire_money_lv2" ->
                            retVal.append("Ovaj slučaj spada pod član 352, tačnije pod stavkom 2. krivičnog zakonika. ");
                    case "acquire_money_lv3" ->
                            retVal.append("Ovaj slučaj spada pod član 352, tačnije pod stavkom 3. krivičnog zakonika. ");
                }

                String childNodeText = node.getChildNodes().item(1).getTextContent();
                if (!prefAdded) {
                    retVal.append("Zatvorska kazna koja može biti u trajanju");
                    prefAdded = true;
                }
                switch (nodeName) {
                    case "max_imprisonment" ->
                            retVal.append(" do ").append(childNodeText);
                    case "min_imprisonment" ->
                            retVal.append(" od ").append(childNodeText);
                }
            }
        }
        if (!retVal.isEmpty())
            retVal.append(" meseci.");
        else
            throw new Exception("Invalid.");

        return retVal.toString();
    }

    @Override
    public String startJudging(CaseDTO caseDTO) {
        Case caseDescription = caseMapper.toEntity(caseDTO);

        Path drDevice = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "dr-device");
        Path startDrDevice = Paths.get(drDevice.toString(), "start.bat");
        Path cleanDrDevice = Paths.get(drDevice.toString(), "clean.bat");

        writeFacts(caseDescription);

        runScript(cleanDrDevice, drDevice);
        runScript(startDrDevice, drDevice);

        String res;
        try {
            res = getResults();
        } catch (Exception ex) {
            res = "Nema informacija o zakonskim odredbama.";
        }
        finally {
            runScript(cleanDrDevice, drDevice);
        }

        return res;
    }
}
