import {
  Avatar,
  Button,
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
import Wrapper from "../components/Wrapper";
import axios from "../utils/axios";
import useIsLoggedIn from "../utils/requestUtils/isLoggedIn";
import { useRouter } from "next/router";
import { EditIcon } from "@chakra-ui/icons";
import ModalSigninForm from "../components/Forms/ModalSigninForm";
import ModalEditTextForm from "../components/Forms/ModalEditTextForm";
import Link from "next/link";

type Props = {
  userName: string;
  bio: string;
  userBlogList?: any[];
  loggedInUserName?: string | null;
};

ProfileCard.defaultProps = {
  userName: "Default User",
  bio: "Default bio",
  loggedInUserName: null,
};

export default function ProfileCard({
  userName,
  bio,
  userBlogList,
  loggedInUserName,
}: Props) {
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
        <Flex>
          <Heading>{userName}</Heading>
          {loggedInUserName}
          {loggedInUserName && <Button>Follow User</Button>}
        </Flex>
        <Heading>NVM It's Segun Adebayo</Heading>
      </Flex>

      <List w={"50%"} h={"80%"}>
        <ListItem>
          <Flex
            border={"1px solid grey"}
            pos={"relative"}
            borderRadius={"5px"}
            h="100px"
          >
            <Text>{bio}</Text>
            <Button>Send Friend Request</Button>
          </Flex>
        </ListItem>

        <ListItem>
          <List>
            {userBlogList.slice(0, 5).map((blog: any, index: number) => (
              <ListItem key={`blogItemNumber${index}`}>
                <Link
                  key={`blogItemLink${index}`}
                  href={`/blogview/${blog.id}`}
                >
                  <Text key={`blogItemTitle${index}`}>{blog.title}</Text>
                </Link>
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
    </Flex>
  );
}
