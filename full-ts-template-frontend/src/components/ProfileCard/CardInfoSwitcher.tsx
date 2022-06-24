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
  currentOptNum: number;
  optionTexts: string[];
  setOptNum: (num: number) => void;
};
CardInfoSwitcher.defaultProps = {
  currentOptNum: 0,
  optionTexts: ["Option 1", "Option 2", "Option 3"],
  setOptNum: (num) => {},
};
export default function CardInfoSwitcher({
  currentOptNum,
  optionTexts,
  setOptNum,
}: Props) {
  return (
    <List display={"flex"} flexDir={"column"}>
      {optionTexts.map((optText, i) => (
        <ListItem
          key={`optNum${i}`}
          onClick={() => {
            setOptNum(i);
          }}
        >
          <Text color={currentOptNum === i ? "gold" : ""}>{optText}</Text>
        </ListItem>
      ))}
    </List>
  );
}
