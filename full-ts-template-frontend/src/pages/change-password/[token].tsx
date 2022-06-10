import { AxiosResponse } from "axios";
import { Formik, Form, Field } from "formik";
import React, { useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import sendResetPassword from "../../utils/requestUtils/sendResetPassword";
import isLoggedIn from "../../utils/requestUtils/isLoggedIn";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

export default function ChangePassword() {
  const [currentUserName, setCurrentUsername] = React.useState(null);
  const [requestLoading, setRequestLoading] = React.useState(true);
  const router = useRouter();
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
      <Formik
        initialValues={{ password: "", passwordConfirm: "" }}
        onSubmit={(values, { setSubmitting }) => {
          if (typeof router.query.token !== "string") {
            return;
          }
          setSubmitting(true);
          console.log(values.password, router.query.token);
          sendResetPassword(router.query.token, values.password);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="password" type="password" placeholder="Password" />
            <Field
              name="passwordConfirm"
              type="password"
              placeholder="Password Confirm"
            />
            <Button
              isLoading={isSubmitting}
              colorScheme="teal"
              variant="outline"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
