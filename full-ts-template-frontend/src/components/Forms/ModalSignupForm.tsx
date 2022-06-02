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

type Props = {
  setUserName: (value: string) => void;
  closeModal: () => void;
};

export default function ModalSignUpForm({ setUserName, closeModal }: Props) {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={async (values, actions) => {
        await axios
          .post("http://localhost:8000/api/v1/auth/register", {
            email: values.email,
            name: values.username,
            password: values.password,
          })
          .then((res) => {
            console.log(res, "Login Response");
            if (res.status === 200 && res.data?.name) {
              setUserName(res.data.name);
              closeModal();
            }
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
          <Field name="username" validate={validateName}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.username && form.touched.username}
              >
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input {...field} id="username" placeholder="username" />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Box my={2}>
            <Field name="password">
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
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
