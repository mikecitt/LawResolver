import { FC } from "react";
import {
  Button,
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
import { AddIcon } from "@chakra-ui/icons";
import AddXml, { DocumentType } from "../AddXml/AddXml";

const laws = [
  {
    id: "66ea3744-d664-4c0a-a391-cdc1c1f32636",
    title: "Zakon o bla bla bla bla bla",
    updatedAt: "14.4.2023.",
  },
  {
    id: "8d805be3-7662-4f95-b681-ed4e366c9161",
    title: "Zakon o bla bla bla bla bla2",
    updatedAt: "15.4.2023.",
  },
  {
    id: "ef6b9ea2-84a3-4424-8094-97847da6b52a",
    title: "Zakon o bla bla bla bla bla3",
    updatedAt: "16.4.2023.",
  },
];

const judgments = [
  {
    id: "66ea3744-d664-4c0a-a391-cdc1c1f32638",
    title: "Presuda o bla bla bla bla bla",
    updatedAt: "14.4.2023.",
  },
  {
    id: "8d805be3-7662-4f95-b681-ed4e366c9165",
    title: "Presuda o bla bla bla bla bla2",
    updatedAt: "15.4.2023.",
  },
  {
    id: "ef6b9ea2-84a3-4424-8094-97847da6b52u",
    title: "Presuda o bla bla bla bla bla3",
    updatedAt: "16.4.2023.",
  },
  {
    id: "66ea3744-d664-4c0a-a391-cdc1c1f32630",
    title: "Presuda o bla bla bla bla bla4",
    updatedAt: "14.4.2023.",
  },
  {
    id: "8d805be3-7662-4f95-b681-ed4e366c916h",
    title: "Presuda o bla bla bla bla bla5",
    updatedAt: "15.4.2023.",
  },
  {
    id: "ef6b9ea2-84a3-4424-8094-97847da6b52g",
    title: "Presuda o bla bla bla bla bla6",
    updatedAt: "16.4.2023.",
  },
];

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => (
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
                <Th>Updated at</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {laws.map(function (x, i) {
                return (
                  <Tr key={x.id}>
                    <Td>{x.title}</Td>
                    <Td>{x.updatedAt}</Td>
                    <Td>
                      <Link color="teal.500" href={"law/" + x.id}>
                        View
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
        <CardFooter justify="end">
          {/* <Button variant="solid" leftIcon={<AddIcon />}>
            Add XML
          </Button> */}
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
              {judgments.map(function (x, i) {
                return (
                  <Tr key={x.id}>
                    <Td>{x.title}</Td>
                    <Td>{x.updatedAt}</Td>
                    <Td>
                      <Link color="teal.500" href={"judgement/" + x.id}>
                        View
                      </Link>
                    </Td>
                  </Tr>
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

export default HomePage;
