package com.ftn.lawresolverapi.service;

import com.ftn.lawresolverapi.service.interfaces.DocumentService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {
    @Override
    public List<String> getFileNames(String docType) throws IOException {
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources("classpath*:documents/" + docType + "/*.xml");
        return Arrays.stream(resources)
                .map(Resource::getFilename)
                .collect(Collectors.toList());
    }
}
