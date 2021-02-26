<script>
  import { query } from "svelte-apollo";
  import * as queries from "./queries.js";

  export let project;
  export let container;

  const collaborators =
    container.type === "repo"
      ? query(queries.GET_REPO_COLLABORATORS, {
          variables: {
            name: container.name,
            owner: container.owner.login,
            number: parseInt(project.number),
          },
          pollInterval: 60000,
        })
      : container.type === "org"
      ? query(queries.GET_ORG_MEMBERS, {
          variables: {
            login: container.login,
            number: parseInt(project.number),
          },
          pollInterval: 60000,
        })
      : null;

  let names;

  $: {
    if (container.type !== "user" && $collaborators.data) {
      if (container.type === "repo") {
        names = $collaborators.data.repository.collaborators.nodes;
      } else if (container.type === "org") {
        names = $collaborators.data.organization.membersWithRole.nodes;
      }
    }
  }
</script>

{#if container.type !== "user"}
  {#if $collaborators.loading}
    Loading...
  {:else if $collaborators.error}
    Error: {$collaborators.error.message}
  {:else}
    {#each names as name}
      {#if name.name}
        <p>{name.name}</p>
      {/if}
    {/each}
  {/if}
{:else}
  <p>{container.name}</p>
{/if}
