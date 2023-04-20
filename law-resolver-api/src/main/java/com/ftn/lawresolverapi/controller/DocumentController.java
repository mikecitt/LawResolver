package com.ftn.lawresolverapi.controller;

import com.ftn.lawresolverapi.dto.FileNamesDTO;
import com.ftn.lawresolverapi.service.interfaces.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/documents/{docType}")
    ResponseEntity<FileNamesDTO> getDocuments(@PathVariable String docType) throws IOException {
        List<String> fileNames = documentService.getFileNames(docType);
        FileNamesDTO fileNamesDTO = new FileNamesDTO(fileNames);
        return ResponseEntity.ok(fileNamesDTO);
    }
}
