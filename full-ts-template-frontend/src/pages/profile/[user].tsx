import { useDisclosure } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import Wrapper from "../../components/Wrapper";
import isLoggedIn from "../../utils/useIsLoggedIn";

type Props = {};

export default function user({}: Props) {
  const router = useRouter();
  let { userName } = router.query;
  if (typeof userName !== "string") {
    userName = "Default User";
  }
  const [currentUserName, setCurrentUsername] = React.useState(null);
  const [requestLoading, setRequestLoading] = React.useState(true);
  useEffect(() => {
    isLoggedIn().then((res: AxiosResponse) => {
      if (res.data.name) {
        setCurrentUsername(res.data.name);
        const router = useRouter();
        router.push("/");
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
      <ProfileCard userName={userName}></ProfileCard>
    </Wrapper>
  );
}
