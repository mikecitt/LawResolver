import React, { FC } from "react";
import "./CaseCard.css";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Box,
  Text,
  SimpleGrid,
  Progress,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { Case } from "../../models";
import { fieldsMap } from "../utils";

interface CaseCardProps {
  similarity?: number;
  description: Case;
}

const CaseCard: FC<CaseCardProps> = ({ description, similarity }) => (
  <Card h="100%">
    <CardHeader>
      {!similarity ? (
        <Heading size="md">Moj slucaj</Heading>
      ) : (
        <Stat>
          <StatNumber>Slucaj #{description.id}</StatNumber>
          <StatLabel>Poklapanje</StatLabel>
          <StatHelpText>{similarity * 100}%</StatHelpText>
        </Stat>
      )}
      {similarity && <Progress value={similarity * 100} />}
    </CardHeader>
    <CardBody>
      <SimpleGrid columns={3} spacing={6}>
        {Object.entries(description)
          .filter((entry) => entry[0] !== "id")
          .map((entry) => {
            return (
              <Box key={entry[0]}>
                <Heading size="xs" textTransform="uppercase">
                  {fieldsMap[entry[0]]}
                </Heading>
                <Text pt="2" fontSize="sm">
                  {entry[1]}
                </Text>
              </Box>
            );
          })}
      </SimpleGrid>
    </CardBody>
  </Card>
);

export default CaseCard;
