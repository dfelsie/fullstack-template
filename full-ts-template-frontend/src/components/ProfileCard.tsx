import {
  Avatar,
  Center,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Wrapper from "../components/Wrapper";
import axios from "../utils/axios";
import useIsLoggedIn from "../utils/useIsLoggedIn";
import { useRouter } from "next/router";
import { EditIcon } from "@chakra-ui/icons";
import ModalSigninForm from "../components/Forms/ModalSigninForm";
import ModalEditTextForm from "../components/Forms/ModalEditTextForm";

type Props = {
  userName: string;
};

ProfileCard.defaultProps = {
  userName: "Default User",
};

export default function ProfileCard({ userName: user }: Props) {
  //const { isLoading, data, error } = useIsLoggedIn();
  return (
    <Flex
      m="auto"
      flexDir={"column"}
      boxShadow={"2xl"}
      w={"50%"}
      h={"100%"}
      alignItems={"center"}
      justifyContent={"space-around"}
      py={"25px"}
    >
      <Flex flexDir={"column"} alignItems={"center"}>
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        <Heading>{user}</Heading>
        <Heading>NVM It's Segun Adebayo</Heading>
      </Flex>

      <List w={"50%"}>
        <ListItem>
          <Flex
            border={"1px solid grey"}
            pos={"relative"}
            borderRadius={"5px"}
            h="100px"
          >
            <Text>{"Default User Bio"}</Text>
          </Flex>
        </ListItem>

        <ListItem>
          <Text>Yet More Wacky Facts!</Text>
        </ListItem>
      </List>
    </Flex>
  );
}
