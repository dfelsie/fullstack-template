import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Button,
} from "@chakra-ui/react";
import axios from "../../utils/axios";
import { Formik, Form, Field } from "formik";
import React from "react";

type Props = {
  setBio: (bio: string) => void;
  closeModal: () => void;
  currBio: string;
};

export default function ModalEditTextForm({
  setBio,
  currBio,
  closeModal,
}: Props) {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ bio: currBio }}
      onSubmit={async (values, actions) => {
        setBio(values.bio);
        closeModal();
      }}
    >
      {(props) => (
        <Form>
          <Box my={2}>
            <Field name="bio">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.bio} height={"100px"}>
                  <FormLabel htmlFor="bio">Text</FormLabel>
                  <Input {...field} id="bio" name="bio" noOfLines={4} />
                  <FormErrorMessage>{form.errors.bio}</FormErrorMessage>
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
