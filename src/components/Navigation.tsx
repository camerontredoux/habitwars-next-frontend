import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";
import isServer from "../utils/isServer";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body;

  if (!data) {
    return null;
  }

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Box>
        <Button
          colorScheme="whatsapp"
          mr="4"
          size={"sm"}
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
        <Button
          size={"sm"}
          colorScheme="whatsapp"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </Box>
    );
  } else {
    body = (
      <Flex alignItems={"center"}>
        <Text mr={4}>{data.me.username}</Text>
        <Button
          colorScheme="whatsapp"
          mr="4"
          size={"sm"}
          onClick={() => {
            logout();
            router.push("/");
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Box py={2} borderBottom={1} borderColor={"gray.200"} borderStyle={"solid"}>
      <Flex maxW={"80%"} mx={"auto"} alignItems={"center"}>
        <Box p="2">
          <NextLink href="/" passHref>
            HabitWars
          </NextLink>
        </Box>
        <Spacer />
        {body}
      </Flex>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Navigation);
