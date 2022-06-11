import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
  Editable,
  EditableTextarea,
  EditablePreview,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { AxiosResponse } from "axios";
import isLoggedIn from "../utils/requestUtils/isLoggedIn";
import { useRouter } from "next/router";
import goHomeIfLoggedout from "../utils/requestUtils/goHomeIfLoggedout";
import addBlogPost from "../utils/requestUtils/addBlogPost";

type Props = {};
export default function Blogeditor({}: Props) {
  const [currentUserName, setCurrentUsername] = React.useState("");
  const [requestLoading, setRequestLoading] = React.useState(true);
  let [textValue, setTextValue] = React.useState("");
  let [textHeadingValue, setTextHeadingValue] = React.useState("");
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setTextValue(inputValue);
  };
  let handleHeadingInputChange = (e) => {
    let inputValue = e.target.value;
    setTextHeadingValue(inputValue);
  };
  const router = useRouter();
  console.log(currentUserName);
  useEffect(() => {
    isLoggedIn().then((res: AxiosResponse) => {
      if (res.data.name) {
        setCurrentUsername(res.data.name);
      } else {
        setCurrentUsername(null);
      }
      goHomeIfLoggedout(router, currentUserName);
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
        <Textarea
          value={textHeadingValue}
          onChange={handleHeadingInputChange}
          placeholder="Here is a sample title"
          size="sm"
        />
        <Textarea
          value={textValue}
          onChange={handleInputChange}
          placeholder="Here is a sample placeholder"
          size="lg"
        />
        <Button
          onClick={() => {
            addBlogPost(textValue, textHeadingValue);
            router.push("/profile/" + currentUserName);
          }}
        >
          Submit Post
        </Button>
      </Center>
    </Wrapper>
  );
}
