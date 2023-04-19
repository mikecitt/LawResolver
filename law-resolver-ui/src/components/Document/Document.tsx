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

interface DocumentProps {}

const Document: FC<DocumentProps> = () => {
  const { id } = useParams();
  const [xml, setXml] = useState("");

  const url = `${API_URL}/law/${id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setXml("<xml>xml goes here</xml>");
      });
  }, [url]);

  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md">Document {id}</Heading>
      </CardHeader>
      <CardBody minH="200px">
        {xml === "" ? <CircularProgress isIndeterminate /> : <pre>{xml}</pre>}
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to="/dummy.xml" target="_blank" download>
            <Button variant="solid">Download XML</Button>
          </Link>
          <Link to="/dummy.pdf" target="_blank" download>
            <Button variant="solid">Download PDF</Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Document;
