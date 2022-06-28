import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Footer } from "./Footer";
import Navbar from "./Navbar/Navbar";

type Props = {
  children: React.ReactNode;
  currentUserName: string | null;
  setCurrentUserName: (isCurrentlyLoggedIn: string | null) => void;
};

export default function Wrapper({
  children,
  currentUserName,
  setCurrentUserName,
}: Props) {
  return (
    <Flex flexDir={"column"} minH={"100vh"} h={"fit-content"} pos={"relative"}>
      <Navbar userName={currentUserName} setUserName={setCurrentUserName} />
      <Box h={"100%"} p={"2%"}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
