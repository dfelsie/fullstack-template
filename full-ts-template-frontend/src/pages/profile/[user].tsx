import { useDisclosure } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import Wrapper from "../../components/Wrapper";
import getBlogPosts from "../../utils/requestUtils/getBlogPosts";
import getUserDataWithBlogsMetadata from "../../utils/requestUtils/getUserDataWithBlogMetadata";
import getUserDataWithBlogs from "../../utils/requestUtils/getUserDataWithBlogs";
import isLoggedIn from "../../utils/requestUtils/isLoggedIn";

type Props = {};

export default function user({}: Props) {
  const router = useRouter();
  let userName: string;
  //console.log(router.query.user);
  if (typeof router.query.user !== "string") {
    userName = "Default User";
  }
  const [userBlogList, setUserBlogList] = React.useState<any[]>([,]);
  const [currentUserName, setCurrentUsername] = React.useState(null);
  const [requestLoading, setRequestLoading] = React.useState(true);
  useEffect(() => {
    isLoggedIn().then((res: AxiosResponse) => {
      //console.log(res);
      if (res.data.name) {
        setCurrentUsername(res.data.name);
        getUserDataWithBlogsMetadata(userName).then((res: AxiosResponse) => {
          if (res.data.blogs) {
            console.log(res.data);
            setUserBlogList(res.data.blogs);
          }
        });
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
      <ProfileCard
        userName={userName}
        userBlogList={userBlogList}
      ></ProfileCard>
    </Wrapper>
  );
}

/* export const getStaticProps = async () => {
  const files = fs.readdirSync("posts");
  return {
    props: {
      slugs: files.map(filename => filename.replace(".md", ""))
    }
  };
}; */
