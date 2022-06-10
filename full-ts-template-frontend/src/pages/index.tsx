import Wrapper from "../components/Wrapper";
import { Center } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import isLoggedIn from "../utils/requestUtils/isLoggedIn";

const Index = () => {
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
        <h1>Hello World!!</h1>
      </Center>
    </Wrapper>
  );
};

export default Index;
