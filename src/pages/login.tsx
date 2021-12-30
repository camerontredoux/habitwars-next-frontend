import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Navigation from "../components/Navigation";
import Wrapper from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  return (
    <>
      <Navigation />
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ options: values });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name={"username"}
                placeholder={"username"}
                label={"Username"}
              />
              <Box mt={2}>
                <InputField
                  name={"password"}
                  placeholder={"password"}
                  label={"Password"}
                  type={"password"}
                />
              </Box>
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
    </>
  );
};

export default Login;
