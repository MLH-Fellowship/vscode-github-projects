<script>
  import { gql } from "@apollo/client";
  import { query } from "svelte-apollo";

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
    console.log($containersInfo);
    if ($containersInfo.data) {
      if ($containersInfo.data.viewer.organizations) {
        for (let organization of $containersInfo.data.viewer.organizations
          .nodes) {
          containers = [...containers, organization];
        }
      }
      if ($containersInfo.data.viewer.repositories) {
        for (let repo of $containersInfo.data.viewer.repositories.nodes) {
          containers = [...containers, repo];
        }
      }
    }
  }
</script>

<style>
  button {
    text-align: left;
    margin: 5px, 5px, 5px, 5px;

  }
</style>

{#if $containersInfo.loading}
  Loading...
{:else if $containersInfo.error}
  Error: {$containersInfo.error.message}
{:else}
  {#each containers as container}
    <h3>{container.name}</h3>
    {#if container.projects}
      {#each container.projects.nodes as project}
        <button>{project.name}</button>
        <!-- <p>{project.body}</p> -->
        <!-- <p>{project.number}</p> -->
      {/each}
    {/if}
    <!-- <p>{container.login ?? container.owner.login}</p> -->
  {/each}
{/if}
