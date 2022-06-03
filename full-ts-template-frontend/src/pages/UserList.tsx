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
import isLoggedIn from "../utils/useIsLoggedIn";
import getUserList from "../utils/getUserList";

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
          {userNameList.map((user) => (
            <ListItem key={`UserNamed:${user}`}>
              <Text fontSize={24}>{user}</Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Center>
    </Wrapper>
  );
}
