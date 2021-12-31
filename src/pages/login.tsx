import { LockIcon, PhoneIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            const errorMap = toErrorMap(response.data.login.errors);
            setErrors(errorMap);
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={"usernameOrEmail"}
              placeholder={"Username or Email"}
              ariaLabel={"Username or Email"}
              icon={<PhoneIcon color="gray.300"></PhoneIcon>}
            />
            <InputField
              name={"password"}
              placeholder={"Password"}
              ariaLabel={"Password"}
              type={"password"}
              icon={<LockIcon color="gray.300"></LockIcon>}
            />
            <Button
              variant="link"
              mt={2}
              float={"right"}
              onClick={() => router.push("/forgot")}
            >
              Forgot Password?
            </Button>
            <Button
              isLoading={isSubmitting}
              w={"100%"}
              mt={4}
              type="submit"
              colorScheme={"whatsapp"}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
