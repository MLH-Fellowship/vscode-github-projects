<script>
  import { ApolloClient, InMemoryCache} from "@apollo/client";
  import { setClient} from "svelte-apollo";
  import SidebarList from "./SidebarList.svelte";

  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: "Bearer f35a00fcfb4544555a8e155fa57bb9245dc43324",
    },
  });
  setClient(client);
</script>

<SidebarList />

<!-- <div>
  <p>Sign in with GitHub to get started.</p>
  <button
    on:click={ 
      () => { //send message to SidebarProvider.ts
        ext_vscode.postMessage({type: 'onSignIn', value: 'success'});
      }
    }
  > Sign in with GitHub </button>
</div> -->
