import { AtSignIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Navigation from "../components/Navigation";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={"username"}
              placeholder={"Username"}
              ariaLabel={"Username"}
              icon={<PhoneIcon color="gray.300"></PhoneIcon>}
            />
            <InputField
              name={"email"}
              placeholder={"Email"}
              ariaLabel={"Email"}
              type={"email"}
              icon={<AtSignIcon color="gray.300"></AtSignIcon>}
            />
            <InputField
              name={"password"}
              placeholder={"Password"}
              ariaLabel={"Password"}
              type={"password"}
              icon={<LockIcon color="gray.300"></LockIcon>}
            />
            <Button
              isLoading={isSubmitting}
              w={"100%"}
              mt={4}
              type="submit"
              colorScheme={"whatsapp"}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
