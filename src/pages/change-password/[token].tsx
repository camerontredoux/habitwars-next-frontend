import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/router";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useForgotPasswordMutation } from "../../generated/graphql";

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values) => {
          const response = await forgotPassword(values);
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

export default ChangePassword;
