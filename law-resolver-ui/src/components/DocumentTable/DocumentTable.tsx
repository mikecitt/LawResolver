import React, { FC, useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "./DocumentTable.css";
import { DocumentType, FileNames } from "../../models";
import { API_URL } from "../../constants";

interface DocumentTableProps {
  type: DocumentType;
}

const DocumentTable: FC<DocumentTableProps> = ({ type }) => {
  const [documents, setDocuments] = useState<string[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch(
        `${API_URL}/documents/${
          type === DocumentType.ACT ? "act" : "judgement"
        }`
      )
        .then((response) => {
          return response.json();
        })
        .then((data: FileNames) => {
          setDocuments(data.fileNames);
          setLoaded(true);
        });
    }
  }, [type, isLoaded]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {type === DocumentType.ACT ? "Zakoni" : "Presude"}
        </Heading>
      </CardHeader>
      <CardBody>
        {!isLoaded ? (
          <CircularProgress isIndeterminate />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Naziv</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.map(function (doc, i) {
                return (
                  <Tr key={doc}>
                    <Td>{doc}</Td>
                    <Td>
                      <Link
                        as={ReactLink}
                        color="blue.500"
                        to={
                          "/" +
                          (type === DocumentType.ACT ? "act" : "judgement") +
                          "/" +
                          doc
                        }
                      >
                        Pogledaj dokument
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default DocumentTable;
