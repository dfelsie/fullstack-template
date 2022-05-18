import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Footer } from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: Props) {
  return (
    <Flex flexDir={"column"} h={"100vh"}>
      <Navbar />
      <Box h={"100%"} p={"2%"}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
