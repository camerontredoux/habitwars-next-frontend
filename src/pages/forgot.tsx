import { AtSignIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface forgotProps {}

export const Forgot: React.FC<forgotProps> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotPassword(values);

          if (response.data?.forgotPassword.errors) {
            setErrors(toErrorMap(response.data.forgotPassword.errors));
          } else if (response.data?.forgotPassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={"email"}
              placeholder={"Email"}
              ariaLabel={"Email"}
              type={"email"}
              icon={<AtSignIcon color={"gray.300"}></AtSignIcon>}
            />
            <Button
              mt={4}
              w={"100%"}
              isLoading={isSubmitting}
              type="submit"
              colorScheme={"whatsapp"}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Forgot);
