import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import Pages from "./pages/allPages";

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: new HttpLink({
    //uri: "http://localhost:8000/graphql",
    //uri: "http://nightly.bitbloq.cc/",
    uri: `${process.env.REACT_APP_API_HOST}`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      "client-name": "License Explorer [web]",
      "client-version": "1.0.0"
    }
  }),
  cache: cache
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: []
  }
});

const Root = () => (
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
