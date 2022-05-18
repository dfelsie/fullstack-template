import {
  Flex,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ModalSigninForm from "./Forms/ModalSigninForm";
import ModalSignupForm from "./Forms/ModalSignupForm";
import { default as NextLink } from "next/link";

type Props = {};

export default function Navbar({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: signupModalIsOpen,
    onOpen: onSignupModalOpen,
    onClose: onSignupModalClose,
  } = useDisclosure();
  const {
    isOpen: signinModalIsOpen,
    onOpen: onSigninModalOpen,
    onClose: onSigninModalClose,
  } = useDisclosure();
  return (
    <>
      <Flex
        bg={"green.100"}
        h={"75px"}
        px={"2.5%"}
        justifyContent={"space-between"}
      >
        <Flex w={"20%"} justifyContent={"space-between"}>
          <Button onClick={onSigninModalOpen}>Sign In</Button>
          <Button onClick={onSignupModalOpen}>Sign Up</Button>
        </Flex>
        <Flex w={"20%"} justifyContent={"space-between"}>
          <Text>Stuff 1</Text>
          <Text>Stuff 2</Text>
        </Flex>
      </Flex>
      <Modal isOpen={signupModalIsOpen} onClose={onSignupModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
            </p>
            <ModalSigninForm></ModalSigninForm>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={signinModalIsOpen} onClose={onSigninModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
            </p>
            <ModalSignupForm></ModalSignupForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
