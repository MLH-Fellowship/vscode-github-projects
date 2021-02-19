<script>
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";
  import ProjectsList from "./ProjectsList.svelte";
  import ProjectInfo from "./ProjectInfo.svelte";

  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: "Bearer f35a00fcfb4544555a8e155fa57bb9245dc43324",
    },
  });
  setClient(client);

  let selectedContainer;
  let selectedProject;

  function handleMessage(event) {
    selectedContainer = event.detail.container;
    selectedProject = event.detail.project;
    console.log(selected);
  }
</script>

{#if !selectedProject}
  <ProjectsList on:message={handleMessage} />
{:else if selectedContainer.type === "repo"}
  <ProjectInfo
    type="repo"
    name={selectedContainer.name}
    owner={selectedContainer.owner}
    number={selectedProject.number}
  />
{:else if selectedContainer.type === "org"}
  <ProjectInfo
    type="org"
    login={selectedContainer.login}
    number={selectedProject.number}
  />
{/if}
