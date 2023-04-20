import { FC, useEffect, useState } from "react";
import "./Document.css";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Heading,
} from "@chakra-ui/react";
import { API_URL } from "../../constants";
import { DocumentType } from "../../models";

interface DocumentProps {
  type: DocumentType;
}

const Document: FC<DocumentProps> = ({ type }) => {
  const { id } = useParams();
  const [xml, setXml] = useState("");

  const url = `${API_URL}/documents/${type}/${id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setXml(data);
      });
  }, [url]);

  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md">Document {id}</Heading>
      </CardHeader>
      <CardBody overflow="auto" maxH="500px" minH="200px">
        {xml === "" ? <CircularProgress isIndeterminate /> : <pre>{xml}</pre>}
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link
            to={`${API_URL}/documents/${type}/${id}`}
            target="_blank"
            download
          >
            <Button variant="solid">Download XML</Button>
          </Link>
          <Link
            to={`${API_URL}/documents/${type}/${id?.replace(".xml", ".pdf")}`}
            target="_blank"
            download
          >
            <Button variant="solid">Download PDF</Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Document;
