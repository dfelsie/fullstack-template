import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { AxiosResponse } from "axios";
import isLoggedIn from "../utils/useIsLoggedIn";

type Props = {};
export default function UserList({}: Props) {
  const [currentUserName, setCurrentUsername] = React.useState(null);
  const [requestLoading, setRequestLoading] = React.useState(true);
  useEffect(() => {
    isLoggedIn().then((res: AxiosResponse) => {
      if (res.data.name) {
        setCurrentUsername(res.data.name);
      }
      setRequestLoading(false);
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
        <List>
          <ListItem>
            <Text>User 1</Text>
          </ListItem>
          <ListItem>
            <Text>User 2</Text>
          </ListItem>
          <ListItem>
            <Text>User 3</Text>
          </ListItem>
        </List>
      </Center>
    </Wrapper>
  );
}
