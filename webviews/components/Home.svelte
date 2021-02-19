<script lang="ts">
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";
  import ProjectInfo from "./ProjectInfo.svelte";

  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: "Bearer f35a00fcfb4544555a8e155fa57bb9245dc43324",
    },
  });
  setClient(client);
</script>

<ProjectInfo type="org" login="petcodeapp" number='1'/>
