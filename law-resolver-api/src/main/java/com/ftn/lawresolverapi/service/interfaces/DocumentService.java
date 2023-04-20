package com.ftn.lawresolverapi.service.interfaces;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    List<String> getFileNames(String docType) throws IOException;
}
