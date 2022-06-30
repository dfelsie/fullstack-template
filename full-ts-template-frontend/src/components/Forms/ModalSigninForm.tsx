import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import axios from "../../utils/axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import sendResetPasswordRequest from "../../utils/requestUtils/sendResetPasswordRequest";

type Props = {
  setUserName: (value: string) => void;
  closeModal: () => void;
};

export default function ModalSignInForm({ setUserName, closeModal }: Props) {
  const [isResetPassword, setIsResetPassword] = useState(false);

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  function validatePassword(password: string) {
    let error;
    if (!password) {
      error = "Password required";
    } else if (password.length < 6) {
      error = "Password must be longer than 6 characters";
    }
    return error;
  }
  if (isResetPassword) {
    return (
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          sendResetPasswordRequest(values.email)
            .then(() => {
              setSubmitting(false);
              closeModal();
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email}>
                  <FormLabel htmlFor="name">Email</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email"
                    {...field}
                    type={"email"}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
                variant="outline"
              >
                Send
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, actions) => {
        await axios
          .post("http://localhost:8000/api/v1/auth/login", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            console.log(res, "Login Response");
            if (res.status === 200 && res.data.name) {
              setUserName(res.data.name);
              //closeModal();
            }
            //window.location.reload();
          })
          .catch((err) => {
            //console.log(err);
          });
        return;
      }}
    >
      {(props) => (
        <Form>
          <Box my={2}>
            <Field name="email" validate={validateName}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
          <Box my={2}>
            <Field name="password" validate={validatePassword}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} id="password" placeholder="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>

          <Flex mt={4} mb={4} justifyContent="flex-end">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
            <Button
              mt={4}
              colorScheme="teal"
              type="button"
              onClick={async () => {
                setIsResetPassword(true);
              }}
            >
              Forget Password
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
