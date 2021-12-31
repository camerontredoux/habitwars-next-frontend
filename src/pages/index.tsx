import { Box, Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState, useEffect } from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import Navigation from "../components/Navigation";
import { usePostsQuery } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();

  let body;

  if (!data) {
    body = (
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Text>Empty</Text>
      </Flex>
    );
  } else {
    body = (
      <Flex justifyContent={"center"} mt={8}>
        <List spacing={3}>
          {data.posts.map((p) => (
            <ListItem key={p.id}>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {p.title}
            </ListItem>
          ))}
        </List>
      </Flex>
    );
  }

  return <>{body}</>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
