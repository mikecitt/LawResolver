import React, { FC } from "react";
import "./AddXml.css";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaFileUpload, FaUpload } from "react-icons/fa";

export enum DocumentType {
  LAW = "law",
  JUDGEMENT = "judgement",
}

interface AddXmlProps {
  docType: DocumentType;
}

const AddXml: FC<AddXmlProps> = ({ docType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={<FaFileUpload />} onClick={onOpen}>
        Add XML
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new {docType.toString()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Select xml file"
              size="md"
              type="file"
              accept=".xml"
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal">Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddXml;
