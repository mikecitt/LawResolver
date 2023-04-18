import { FC, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Link,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "./HomePage.css";
import AddXml, { DocumentType } from "../AddXml/AddXml";
import { JudgementDocument, LawDocument } from "../../models";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [laws, setLaws] = useState<LawDocument[]>([]);
  const [judgements, setJudgements] = useState<JudgementDocument[]>([]);
  const [filteredLaw, setFilteredLaw] = useState("");

  const fetchData = () => {
    Promise.all([
      fetch("https://law-resolver.free.mockoapp.net/api/laws")
        .then((response) => {
          return response.json();
        })
        .then((data: LawDocument[]) => {
          setLaws(data);
        }),

      fetch("https://law-resolver.free.mockoapp.net/api/judgements")
        .then((response) => {
          return response.json();
        })
        .then((data: JudgementDocument[]) => {
          setJudgements(data);
        }),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SimpleGrid columns={2} spacing={5} p={5}>
        <Card>
          <CardHeader>
            <Heading size="md">Laws</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {laws.map(function (x, i) {
                  return (
                    <Tr
                      backgroundColor={
                        filteredLaw === x.id ? "teal.50" : "system"
                      }
                      onClick={() => setFilteredLaw(x.id)}
                      key={x.id}
                    >
                      <Td>{x.name}</Td>
                      <Td>
                        <Link
                          color="teal.500"
                          href={
                            "https://law-resolver.free.mockoapp.net/api/law/" +
                            x.id
                          }
                        >
                          View Document
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
          <CardFooter justify="end">
            <AddXml docType={DocumentType.LAW} />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Judgments</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Updated at</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {judgements.map(function (x, i) {
                  return (
                    (filteredLaw === "" || x.law === filteredLaw) && (
                      <Tr key={x.id}>
                        <Td>{x.name}</Td>
                        <Td>
                          <Link color="teal.500" href={"judgement/" + x.id}>
                            View
                          </Link>
                        </Td>
                      </Tr>
                    )
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
          <CardFooter justify="end">
            <AddXml docType={DocumentType.JUDGEMENT} />
          </CardFooter>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default HomePage;
