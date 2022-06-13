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
import Wrapper from "../../components/Wrapper";
import isLoggedIn from "../../utils/requestUtils/isLoggedIn";
import getBlogDataFromId from "../../utils/requestUtils/getBlogDataFromId";

type Props = {
  blogTitle: string;
  blogContent: string;
};
export default function Blog({ blogTitle, blogContent }: Props) {
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
        <Box> Blogview </Box>
        <Text>{blogTitle}</Text>
        <Text>{blogContent}</Text>
      </Center>
    </Wrapper>
  );
}

Blog.getInitialProps = async (ctx) => {
  const blogId = ctx.query.blog;
  let blogTitle;
  let blogContent;
  const blogData = await getBlogDataFromId(blogId);
  if (!blogData) {
    return { blogTitle: "", blogContent: "" };
  }
  const blogJson = await blogData.data;
  console.log(blogJson);
  return { blogTitle: blogJson.title, blogContent: blogJson.content };
};
