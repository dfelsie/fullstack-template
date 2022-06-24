import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";

type Props = {
  bodyType: string;
};
ProfileCardBody.defaultProps = {
  bodyType: "Default",
};
export default function ProfileCardBody({ bodyType }: Props) {
  switch (bodyType) {
    case "Follows":
      return <Box>Follows</Box>;
    case "Blogs":
      return <Box>Blogs</Box>;
    default:
      return <Box>Overview</Box>;
  }
}
