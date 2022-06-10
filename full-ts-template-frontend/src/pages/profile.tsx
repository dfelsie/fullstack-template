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
import useIsLoggedIn from "../utils/isLoggedIn";
import { useRouter } from "next/router";
import { EditIcon } from "@chakra-ui/icons";
import ModalSigninForm from "../components/Forms/ModalSigninForm";
import ModalEditTextForm from "../components/Forms/ModalEditTextForm";
import isLoggedIn from "../utils/isLoggedIn";
import { AxiosResponse } from "axios";

type Props = {};

export default function profile({}: Props) {
  const [bio, setBio] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentUserName, setCurrentUsername] = React.useState(null);
  const [requestLoading, setRequestLoading] = React.useState(true);
  useEffect(() => {
    isLoggedIn().then((res: AxiosResponse) => {
      if (res.data.name) {
        setCurrentUsername(res.data.name);
        const router = useRouter();
        router.push("/");
        //console.log(res.data.name, "res.data.name");
      }
      setRequestLoading(false);
    });
  }, []);
  if (requestLoading) {
    return <></>;
  }

  return (
    <Wrapper
      setCurrentUserName={setCurrentUsername}
      currentUserName={currentUserName}
    >
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
          <Heading>{currentUserName}</Heading>
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
              <Text>{bio}</Text>
              <EditIcon
                pos={"absolute"}
                fontSize={"3xl"}
                right={0}
                bottom={0}
                onClick={onOpen}
              ></EditIcon>
            </Flex>
          </ListItem>

          <ListItem>
            <Text>Yet More Wacky Facts!</Text>
          </ListItem>
        </List>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
            </p>
            <ModalEditTextForm
              setBio={setBio}
              currBio={bio}
              closeModal={onClose}
            ></ModalEditTextForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}
