import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { AxiosResponse } from "axios";
import isLoggedIn from "../utils/requestUtils/isLoggedIn";
import getUserList from "../utils/requestUtils/getUserList";
import { default as NextLink } from "next/link";

type Props = {};
export default function UserList({}: Props) {
  const [currentUserName, setCurrentUsername] = React.useState(null);
  const [requestLoading, setRequestLoading] = React.useState(true);
  const [userNameList, setUserNameList] = React.useState([]);
  useEffect(() => {
    isLoggedIn().then((res: AxiosResponse) => {
      if (res.data.name) {
        setCurrentUsername(res.data.name);
      }
      setRequestLoading(false);
    });
  }, []);
  useEffect(() => {
    getUserList().then((res: AxiosResponse) => {
      if (res.data) {
        //console.log(res.data);
        setUserNameList(res.data);
      }
    });
  }, []);
  if (requestLoading) {
    return <></>;
  }
  return (
    <Wrapper
      currentUserName={currentUserName}
      setCurrentUserName={setCurrentUsername}
    >
      <Center flexDir={"column"}>
        <Heading>User List</Heading>
        <UnorderedList>
          {userNameList.map((user, index) => (
            <ListItem key={`UserNamed:${user}${index}`}>
              <NextLink href={`profile/${user}`}>
                <Text fontSize={24}>{user}</Text>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Center>
    </Wrapper>
  );
}
