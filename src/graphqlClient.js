import { GraphQLClient } from "graphql-request";

const API_KEY = process.env.EXPO_PUBLIC_STEPZEN_API_KEY;
const endpoint =
  "https://ishohatake.us-east-a.ibm.stepzen.net/api/solemn-fish/graphql";

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: API_KEY,
  },
});

export default client;
