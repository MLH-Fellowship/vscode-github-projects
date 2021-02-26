<script>
  import Collaborators from "./Collaborators.svelte";
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";

  let filterInclude = ["Repository"];

  $: ext_vscode.postMessage({ type: "onChangeFilter", value: filterInclude });

  let menu = [
    "Personal Profile",
    "Repository",
    "Organization",
    "Include Closed Projects",
  ];

  function join(filterInclude) {
    if (filterInclude.length === 1) return filterInclude[0];
    return `${filterInclude.slice(0, -1).join(", ")} and ${
      filterInclude[filterInclude.length - 1]
    }`;
  }

  $: session = null;

  let project;
  let container;

  window.addEventListener("message", async (event) => {
    const message = event.data;

    switch (message.command) {
      case "authComplete":
        session = message.payload.session;
        break;
      case "projectChosen":
        project = message.payload.project;
        container = message.payload.container;
        break;
    }
  });
  // send message as soon as sidebar loads.
  ext_vscode.postMessage({ type: "onSignIn", value: "success" });

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
</script>

{#if !session}
  <div>
    <p>Sign in with GitHub to get started.</p>
    <button
      on:click={() => {
        //send message to SidebarProvider.ts
        ext_vscode.postMessage({ type: "onSignIn", value: "success" });
      }}
    >
      Sign in with GitHub
    </button>
  </div>
{:else if !project}
  <div>
    <!-- <button
      on:click={() => {
        //send message to SidebarProvider.ts
        ext_vscode.postMessage({ type: 'onSignIn', value: 'noNotification' });
      }}
      class="seeProjectsButton"
    >
      See Projects
    </button> -->

    <h2 style="margin-bottom: 1rem">Filter Projects</h2>

    {#each menu as flavour}
      <label class="labels">
        <input
          type="checkbox"
          bind:group={filterInclude}
          value={flavour}
          class="checkBox"
        />
        {flavour}
      </label>
    {/each}
  </div>
{:else}
  <h2>Project</h2>
  <h4>{project.name}</h4>
  <div style="height: 1.5rem;" />
  <h2>Collaborators/Members</h2>
  <Collaborators {project} {container} />
{/if}
