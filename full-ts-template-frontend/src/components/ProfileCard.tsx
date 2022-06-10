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
};

ProfileCard.defaultProps = {
  userName: "Default User",
  bio: "Default bio",
  userBlogList: [],
};

export default function ProfileCard({ userName, bio, userBlogList }: Props) {
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
        <Heading>{userName}</Heading>
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
          </Flex>
        </ListItem>

        <ListItem>
          <Text>Yet More Wacky Facts!</Text>
          <List>
            {userBlogList.map((blog: any) => (
              <ListItem key={blog.id}>
                {/* <Link href="blogview">
                </Link> */}
                <Text>{blog.title}</Text>
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
    </Flex>
  );
}
