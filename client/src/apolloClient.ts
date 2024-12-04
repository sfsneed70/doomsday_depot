import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL endpoint
});

// Add an authentication token to each request
const authLink = setContext((_, { headers }) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("id_token"); // Replace with your token key
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Combine the authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // Use in-memory caching
});

export default client;
