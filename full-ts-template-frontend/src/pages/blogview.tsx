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
import { AxiosResponse } from "axios";
import Wrapper from "../components/Wrapper";
import isLoggedIn from "../utils/requestUtils/isLoggedIn";

type Props = {
  blogTitle: string;
  blogContent: string;
};
export default function Blogview({ blogTitle, blogContent }: Props) {
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
      <Flex flexDir={"column"}>
        <Box> Blogview </Box>
      </Flex>
    </Wrapper>
  );
}
