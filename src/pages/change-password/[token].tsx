import { LockIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import { useState } from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import createUrqlClient from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const [badToken, setBadToken] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setBadToken(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={"newPassword"}
              placeholder={"Password"}
              ariaLabel={"Password"}
              type={"password"}
              icon={<LockIcon color={"gray.300"}></LockIcon>}
            />
            {badToken ? (
              <Box>
                <Text
                  fontSize={"sm"}
                  mt={2}
                  textColor={"red.300"}
                  display={"inline-block"}
                >
                  {badToken}
                </Text>
                <Button
                  variant="link"
                  mt={2}
                  float={"right"}
                  onClick={() => router.push("/forgot")}
                >
                  Forgot Password?
                </Button>
              </Box>
            ) : null}
            <Button
              mt={4}
              w={"100%"}
              isLoading={isSubmitting}
              type="submit"
              colorScheme={"whatsapp"}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
