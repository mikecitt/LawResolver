import React, { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import "./HomePage.css";
import DocumentTable from "../DocumentTable/DocumentTable";
import { DocumentType } from "../../models";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div>
      <SimpleGrid columns={2} spacing={5} p={5}>
        <DocumentTable type={DocumentType.ACT} />
        <DocumentTable type={DocumentType.JUDGEMENT} />
      </SimpleGrid>
    </div>
  );
};

export default HomePage;
