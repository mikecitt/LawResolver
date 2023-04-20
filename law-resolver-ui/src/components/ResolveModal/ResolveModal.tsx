import React, { FC, useState } from "react";
import "./ResolveModal.css";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FaGavel } from "react-icons/fa";
import { useForm } from "react-hook-form";

interface ResolveModalProps {}

const ResolveModal: FC<ResolveModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caseNumber, setCaseNumber] = useState<number>(0);
  const [courts, setCourts] = useState<string[]>([]);
  const [judgementTypes, setJudgementTypes] = useState<string[]>([]);

  const [radioValue, setRadioValue] = React.useState("");
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const openModal = () => {
    setCaseNumber(0);
    setCourts([]);
    setJudgementTypes([]);
    setRadioValue("");
    onOpen();
    setTimeout(() => {
      setCaseNumber(7);
      setCourts(["osnovni", "visi", "apelacioni", "vrhovni"]);
      setJudgementTypes(["Deklaratorna", "Konstitutivna", "Kondemnatorna"]);
      setRadioValue(judgementTypes[0]);
    }, 1000);
  };

  const onsubmit = (values: any) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  };

  const capitalize = (string: string) => {
    return string.replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <>
      <Button
        onClick={openModal}
        colorScheme="blue"
        size="sm"
        mr={4}
        leftIcon={<FaGavel />}
      >
        Novi slucaj
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH="200px">
          <ModalHeader>
            <Flex gap="5px">
              Novi slucaj -
              <Skeleton fitContent isLoaded={caseNumber !== 0}>
                #{caseNumber}
              </Skeleton>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onsubmit)}>
            <ModalBody>
              <FormControl mt={4} isRequired>
                <FormLabel>Sud</FormLabel>
                <Skeleton isLoaded={courts.length > 0}>
                  <Select {...register("sud")} placeholder="Odaberite sud">
                    {courts.map((court) => (
                      <option key={court} value={court}>
                        {capitalize(court) + " sud"}
                      </option>
                    ))}
                  </Select>
                </Skeleton>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Poslovni broj</FormLabel>
                <Input {...register("poslovni_broj")} type="text" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Sudija</FormLabel>
                <Input {...register("sudija")} type="text" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Tuzilac</FormLabel>
                <Input {...register("tuzilac")} type="text" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Okrivljeni</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Krivicno delo</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Vrsta presude</FormLabel>
                <RadioGroup onChange={setRadioValue} value={radioValue}>
                  <Skeleton height="24px" isLoaded={judgementTypes.length > 0}>
                    <Stack direction="row">
                      {judgementTypes.map((type) => (
                        <Radio colorScheme="blue" value={type}>
                          {capitalize(type)}
                        </Radio>
                      ))}
                    </Stack>
                  </Skeleton>
                </RadioGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Primenjeni propisi</FormLabel>
                <Textarea />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Zatvori
              </Button>
              <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
                Sledeci korak
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResolveModal;
