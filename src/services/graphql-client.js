import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

const link = true
  ? new HttpLink({
      uri: "http://localhost:8000/graphql",
      credentials: "include",
    })
  : null

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
