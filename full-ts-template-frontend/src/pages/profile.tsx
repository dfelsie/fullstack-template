import {
  Avatar,
  Center,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Wrapper from "../components/Wrapper";

type Props = {};

export default function profile({}: Props) {
  return (
    <Wrapper>
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
          <Heading>Bam Adebayo</Heading>
          <Heading>NVM It's Segun Adebayo</Heading>
        </Flex>
        <List>
          <ListItem>
            <Text>Some wacky facts!</Text>
          </ListItem>

          <ListItem>
            <Text>Yet More Wacky Facts!</Text>
          </ListItem>
        </List>
      </Flex>
    </Wrapper>
  );
}
