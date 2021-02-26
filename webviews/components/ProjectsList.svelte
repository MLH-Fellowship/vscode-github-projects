<script>
  import { query } from "svelte-apollo";
  import { createEventDispatcher } from "svelte";
  import * as queries from "./queries.js";

  const dispatch = createEventDispatcher();

  const containersInfo = query(queries.GET_CONTAINER_WITH_PROJECT, {
    pollInterval: 5000,
  });

  export let filters = [];

  let containers = [];
  let indexes = [];

  $: {
    if ($containersInfo.data) {
      containers = [];
      if (
        $containersInfo.data.viewer.organizations &&
        filters.includes("Organization")
      ) {
        for (let organization of $containersInfo.data.viewer.organizations
          .nodes) {
          let newOrg = addType(organization, "org");
          containers = [...containers, newOrg];
        }
      }
      if (
        $containersInfo.data.viewer.repositories &&
        filters.includes("Repository")
      ) {
        for (let repo of $containersInfo.data.viewer.repositories.nodes) {
          let newRepo = addType(repo, "repo");
          containers = [...containers, newRepo];
        }
      }
      if (filters.includes("Personal Profile")) {
        let newUser = addType($containersInfo.data.viewer, "user");
        containers = [...containers, newUser];
      }

      indexes = [];
      containers.forEach((container, index) => {
        if (container.projects) {
          container.projects.nodes.forEach((project) => {
            if (
              filters.includes("Include Closed Projects") ||
              !project.closed
            ) {
              indexes = [...indexes, index];
            }
          });
        }
      });
    }
  }

  function handleSelectProject(container, project) {
    dispatch("message", {
      container: container,
      project: project,
    });
  }

  function addType(data, type) {
    return {
      ...data,
      type: type,
    };
  }
</script>

{#if $containersInfo.loading}
  Loading...
{:else if $containersInfo.error}
  Error: {$containersInfo.error.message}
{:else}
  {#each containers as container, index}
    {#if indexes.includes(index)}
      <h3>{container.name}</h3>
      {#each container.projects.nodes as project}
        {#if filters.includes("Include Closed Projects") || !project.closed}
          <button on:click={handleSelectProject(container, project)}
            >{project.name}</button
          >
        {/if}
      {/each}
    {/if}
  {/each}
{/if}

<style>
  button {
    text-align: left;
    margin: 5px, 5px, 5px, 5px;
  }
</style>
