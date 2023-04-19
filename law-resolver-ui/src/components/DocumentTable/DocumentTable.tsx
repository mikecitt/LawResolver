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
import { Document, DocumentType } from "../../models";
import { API_URL } from "../../constants";

interface DocumentTableProps {
  type: DocumentType;
}

const DocumentTable: FC<DocumentTableProps> = ({ type }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch(`${API_URL}/${type.toLowerCase()}`)
        .then((response) => {
          return response.json();
        })
        .then((data: Document[]) => {
          setDocuments(data);
          setLoaded(true);
        });
    }
  }, [type, isLoaded]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{type}</Heading>
      </CardHeader>
      <CardBody>
        {!isLoaded ? (
          <CircularProgress isIndeterminate />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.map(function (x, i) {
                return (
                  <Tr key={x.name}>
                    <Td>{x.name}</Td>
                    <Td>
                      <Link
                        as={ReactLink}
                        color="teal.500"
                        to={"/document/" + x.name}
                      >
                        View Document
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
