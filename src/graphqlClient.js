import { GraphQLClient } from "graphql-request";

const API_KEY = process.env.EXPO_PUBLIC_STEPZEN_API_KEY;
const endpoint = process.env.EXPO_PUBLIC_STEPZEN_ENDPOINT;

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: API_KEY,
  },
});

export default client;
