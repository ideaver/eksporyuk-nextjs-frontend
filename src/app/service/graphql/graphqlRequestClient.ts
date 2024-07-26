import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA as string;

const createApolloClient = ({ token }: { token: string | undefined }) => {
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    headers,
  });
};

export default createApolloClient;
