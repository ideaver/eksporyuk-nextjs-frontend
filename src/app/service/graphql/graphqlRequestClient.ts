import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA as string;

const createApolloClient = () => {
    return new ApolloClient({
        link: createUploadLink({ uri: GRAPHQL_ENDPOINT }) as unknown as ApolloLink,
        cache: new InMemoryCache(),
        headers: {
            'Apollo-Require-Preflight': 'true'
        }
    });
};

export default createApolloClient;