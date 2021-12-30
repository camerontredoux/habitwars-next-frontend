import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Navigation from "../components/Navigation";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <>
      <Navigation />
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
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
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Register;
