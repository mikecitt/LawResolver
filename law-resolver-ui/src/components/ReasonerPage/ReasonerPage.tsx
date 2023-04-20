import React, { FC, useState } from "react";
import "./ReasonerPage.css";
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Button,
  Box,
  Grid,
  Card,
  VStack,
  CardHeader,
  CardBody,
  Heading,
  HStack,
  CardFooter,
  SimpleGrid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../constants";
import { Case, CaseInfo, ResonerResponse } from "../../models";
import CaseCard from "../CaseCard/CaseCard";

interface ReasonerPageProps {}

const ReasonerPage: FC<ReasonerPageProps> = () => {
  const [myCaseDescription, setMyCaseDescription] = useState<Case>();
  const [cases, setCases] = useState<CaseInfo[]>([]);
  const [result, setResult] = useState<string>("");
  const [saveCaseEnabled, setSaveCaseEnabled] = useState<boolean>(true);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onsubmit = (values: any) => {
    values.regulations = values.regulations.split("\n");
    return fetch(`${API_URL}/judge`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data: ResonerResponse) => {
        setMyCaseDescription(values);
        setResult(data.rules);
        setCases(data.cases);
      });
  };

  return (
    <VStack p={5}>
      {!myCaseDescription && (
        <Card w="100%">
          <form onSubmit={handleSubmit(onsubmit)}>
            <CardHeader>
              <Heading size="md">Moj slucaj</Heading>
            </CardHeader>
            <CardBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <FormControl isRequired>
                  <FormLabel>Sud</FormLabel>
                  <Input {...register("court")} type="text" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Poslovni broj</FormLabel>
                  <Input {...register("caseNumber")} type="text" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Sudija</FormLabel>
                  <Input {...register("judge")} type="text" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tuzilac</FormLabel>
                  <Input {...register("prosecutor")} type="text" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Okrivljeni</FormLabel>
                  <Input {...register("defendant")} type="text" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Krivicno delo</FormLabel>
                  <Input {...register("felony")} type="text" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Vrsta presude</FormLabel>
                  <Input {...register("judgementType")} type="text" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Napravljena steta</FormLabel>
                  <NumberInput defaultValue={0}>
                    <NumberInputField {...register("gainedMoney")} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Novcana kazna</FormLabel>
                  <NumberInput defaultValue={0}>
                    <NumberInputField {...register("fine")} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Kazna zatvora</FormLabel>
                  <NumberInput defaultValue={0}>
                    <NumberInputField {...register("prison")} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Primenjeni propisi</FormLabel>
                  <Textarea {...register("regulations")} />
                </FormControl>
              </Grid>
            </CardBody>
            <CardFooter>
              <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
                Rezonuj
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
      {result !== "" && !!myCaseDescription && (
        <Grid templateColumns="repeat(3, 1fr)" gap={2} w="100%">
          <GridItem colSpan={2}>
            <CaseCard description={myCaseDescription} />
          </GridItem>
          <GridItem>
            <Card h="100%">
              <CardHeader>
                <Heading size="md">Rezultat</Heading>
              </CardHeader>
              <CardBody>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {result}
                  </Heading>
                </Box>
              </CardBody>
              <CardFooter justify="space-between">
                <Button
                  isDisabled={!saveCaseEnabled}
                  onClick={() => {
                    toast({
                      title: "Uspesna operacija",
                      description: "Slucaj je sacuvan u bazi.",
                      status: "success",
                      duration: 5000,
                      position: "top-right",
                      isClosable: true,
                    });
                    return fetch(`${API_URL}/judge/case`, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(myCaseDescription),
                    }).then((response) => {
                      setSaveCaseEnabled(false);
                    });
                  }}
                  variant="solid"
                  colorScheme="blue"
                >
                  Sacuvaj slucaj
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    setMyCaseDescription(undefined);
                    setResult("");
                    setCases([]);
                    reset();
                    toast({
                      title: "Ponisteno",
                      description: "Slucaj je ponisten.",
                      status: "info",
                      duration: 5000,
                      position: "top-right",
                      isClosable: true,
                    });
                  }}
                >
                  Ponisti
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      )}
      {cases.length > 0 && (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {cases.map((c) => {
            return (
              <GridItem key={c.acase.id} h="100%" w="100%">
                <CaseCard similarity={c.similarity} description={c.acase} />
              </GridItem>
            );
          })}
        </Grid>
      )}
    </VStack>
  );
};

export default ReasonerPage;
