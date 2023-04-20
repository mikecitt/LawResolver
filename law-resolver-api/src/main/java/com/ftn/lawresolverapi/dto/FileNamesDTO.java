package com.ftn.lawresolverapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FileNamesDTO {
    private List<String> fileNames;

    public FileNamesDTO() {
        fileNames = new ArrayList<>();
    }

    public FileNamesDTO(List<String> fileNames) {
        this.fileNames = fileNames;
    }
}
