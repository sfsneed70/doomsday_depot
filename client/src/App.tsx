import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/NavBar";
import Auth from "./utils/auth";
import { AuthProvider } from "./utils/AuthContext";

import Chatbot from "./components/Chatbot";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem("id_token");  BAD PRACTICE, use getToken() instead
  const token = Auth.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
});

type AuthContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
      <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
        {/* Background gradient */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
          </div>
        </div>

        <div className='relative z-50 pt-20'>
          <AuthProvider>
            <Navbar />
            <Chatbot />
            <div >
              <Outlet context={[loggedIn, setLoggedIn] satisfies AuthContextType} />
            </div>
          </AuthProvider>
        </div>
      </div>

    </ApolloProvider>
  );
}

export function useLoggedIn() {
  return useOutletContext<AuthContextType>();
}

export default App;
