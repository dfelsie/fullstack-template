import {
  useDisclosure,
  Flex,
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import logout from "../../utils/requestUtils/logout";
import sensitiveDataTest from "../../utils/test/sensitiveDataTest";
import ModalSigninForm from "../Forms/ModalSigninForm";
import ModalSignupForm from "../Forms/ModalSignupForm";

export function makeNavBody(
  isLoggedIn: boolean,
  setUserName: (userName: string | null) => void
) {
  const router = useRouter();
  if (!isLoggedIn) {
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
        <Flex w={"20%"} justifyContent={"space-between"}>
          <Button onClick={onSigninModalOpen}>Sign In</Button>
          <Button onClick={onSignupModalOpen}>Sign Up</Button>
          <Button
            onClick={() => {
              sensitiveDataTest();
            }}
          >
            Sensitive Data
          </Button>
        </Flex>

        <Modal isOpen={signinModalIsOpen} onClose={onSigninModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign In</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              </p>
              <ModalSigninForm
                setUserName={setUserName}
                closeModal={onSigninModalClose}
              ></ModalSigninForm>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={signupModalIsOpen} onClose={onSignupModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              </p>
              <ModalSignupForm
                setUserName={setUserName}
                closeModal={onSignupModalClose}
              ></ModalSignupForm>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Flex w={"40%"} justifyContent={"space-between"}>
        <Button
          onClick={() => {
            sensitiveDataTest();
          }}
        >
          Sensitive Data
        </Button>
        <Button
          onClick={() => {
            logout();
            setUserName(null);
            router.push("/");
          }}
        >
          Logout
        </Button>
      </Flex>
      <Link href={"/blogeditor"}>
        <Button>Blog Writer</Button>
      </Link>
      <Link href={"userlist"}>
        <Button>User List</Button>
      </Link>
    </>
  );
}
