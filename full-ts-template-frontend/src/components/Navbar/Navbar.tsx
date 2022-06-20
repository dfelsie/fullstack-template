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
import ModalSigninForm from "../Forms/ModalSigninForm";
import ModalSignupForm from "../Forms/ModalSignupForm";
import { default as NextLink } from "next/link";
import sensitiveDataTest from "../../utils/test/sensitiveDataTest";
import logout from "../../utils/requestUtils/logout";
import { makeNavBody } from "./NavbarUtils";
import { useRouter } from "next/router";

type Props = {
  userName: String | null;
  setUserName: (userName: String | null) => void;
};

export default function Navbar({ userName, setUserName }: Props) {
  //const router = useRouter();
  return (
    <>
      <Flex
        bg={"green.100"}
        h={"75px"}
        px={"2.5%"}
        justifyContent={"space-between"}
      >
        {makeNavBody(userName !== null, setUserName)}
      </Flex>
    </>
  );
}
