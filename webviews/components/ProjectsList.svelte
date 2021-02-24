<script>
  import { gql } from "@apollo/client";
  import { query } from "svelte-apollo";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const GET_CONTAINER_WITH_PROJECT = gql`
    query GetContainerWithProject {
      viewer {
        organizations(first: 100) {
          nodes {
            name
            login
            projects(first: 100) {
              nodes {
                name
                body
                number
                closed
              }
            }
          }
        }
        repositories(
          affiliations: [OWNER, ORGANIZATION_MEMBER, COLLABORATOR]
          first: 100
        ) {
          nodes {
            name
            owner {
              login
            }
            projects(first: 100) {
              nodes {
                name
                body
                number
                closed
              }
            }
          }
        }
      }
    }
  `;

  const containersInfo = query(GET_CONTAINER_WITH_PROJECT);

  let containers = [];

  $: {
    if ($containersInfo.data) {
      if ($containersInfo.data.viewer.organizations) {
        for (let organization of $containersInfo.data.viewer.organizations
          .nodes) {
          let newOrg = addType(organization, "org");
          containers = [...containers, newOrg];
        }
      }
      if ($containersInfo.data.viewer.repositories) {
        for (let repo of $containersInfo.data.viewer.repositories.nodes) {
          let newRepo = addType(repo, "repo");
          containers = [...containers, newRepo];
        }
      }
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
  {#each containers as container}
    <h3>{container.name}</h3>
    {#if container.projects}
      {#each container.projects.nodes as project}
        {#if !project.closed}
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
