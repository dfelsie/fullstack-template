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
} from "@chakra-ui/react";
import logout from "../../utils/logout";
import sensitiveDataTest from "../../utils/test/sensitiveDataTest";
import ModalSigninForm from "../Forms/ModalSigninForm";
import ModalSignupForm from "../Forms/ModalSignupForm";

export function makeNavBody(
  isLoggedIn: boolean,
  setUserName: (userName: string | null) => void
) {
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
          }}
        >
          Logout
        </Button>
      </Flex>
      <Box>Stuff</Box>;
    </>
  );
}
