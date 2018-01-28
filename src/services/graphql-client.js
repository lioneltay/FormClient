import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

// Conditional link production vs dev
const link = true
  ? new HttpLink({
      uri: "http://localhost:8000/graphql",
      credentials: "include",
    })
  : null

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default apolloClient

export const requestClient = {
  mutate: ({ mutation, variables }) =>
    apolloClient.mutate({ mutation, variables }),
  query: ({ query, variables }) => apolloClient.query({ query, variables }),
}
