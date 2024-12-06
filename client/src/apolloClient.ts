import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",

});


const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem("id_token"); // Replace with your token key
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // Use in-memory caching
});

export default client;
