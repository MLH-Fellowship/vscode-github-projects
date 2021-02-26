<script>
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";
  import ProjectsList from "./ProjectsList.svelte";
  import ProjectInfo from "./ProjectInfo.svelte";

  let session;

  let filters = ["Repository"];

  window.addEventListener("message", async (event) => {
    console.log("session");
    console.log(session);
    console.log(event.data);
    const message = event.data;
    switch (message.command) {
      case "authComplete":
        console.log(message.payload.session);
        session = message.payload.session;
        break;
      case "changeFilters":
        console.log(message.payload.filters);
        filters = message.payload.filters;
        break;
    }
    console.log(session);
  });

  let client;

  $: {
    if (session) {
      client = new ApolloClient({
        uri: "https://api.github.com/graphql",
        cache: new InMemoryCache(),
        headers: {
          authorization: `Bearer ${session.accessToken}`,
        },
      });
      setClient(client);
    }
  }

  let selectedContainer;
  let selectedProject;

  function handleMessage(event) {
    selectedContainer = event.detail.container;
    selectedProject = event.detail.project;
  }
</script>

{#if !client}
  <!-- When webview is reloaded, client is not defined. -->
  <p>Client is not set, Sign In with GitHub first.</p>
{:else if !selectedProject}
  <ProjectsList on:message={handleMessage} {filters} />
{:else if selectedContainer.type === "repo"}
  <ProjectInfo
    type="repo"
    name={selectedContainer.name}
    owner={selectedContainer.owner.login}
    number={selectedProject.number}
  />
{:else if selectedContainer.type === "org"}
  <ProjectInfo
    type="org"
    login={selectedContainer.login}
    number={selectedProject.number}
  />
{:else if selectedContainer.type === "user"}
  <ProjectInfo type="user" number={selectedProject.number} />
{/if}
