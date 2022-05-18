import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";

export const Footer = (props: {}) => (
  <Flex as="footer" h={"50px"} {...props} bg={"green.100"}>
    <Text>Double!</Text>
  </Flex>
);
