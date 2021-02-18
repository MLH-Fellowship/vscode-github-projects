<script>
  import { gql } from "@apollo/client";
  import { query } from "svelte-apollo";

  const GET_REPO_PROJECT_INFO = gql`
    query GetRepoProjectInfo($name: String!, $owner: String!, $number: Int!) {
      repository(name: $name, owner: $owner) {
        project(number: $number) {
          name
          body
          columns(first: 100) {
            nodes {
              name
              cards(first: 100) {
                nodes {
                  content
                  note
                }
              }
            }
          }
        }
      }
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
    }
  `;

  const GET_ORG_PROJECT_INFO = gql`
    query GetOrgProjectInfo($login: String!, $number: Int!) {
      organization(login: $login) {
        project(number: $number) {
          name
          body
          columns(first: 100) {
            nodes {
              name
              cards(first: 100) {
                nodes {
                  content
                  note
                }
              }
            }
          }
        }
      }
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
    }
  `;

  export let type, name, owner, login, number;

  const projectInfo =
    type === "repo"
      ? query(GET_REPO_PROJECT_INFO, {
          variables: {
            name: name,
            owner: owner,
            number: parseInt(number),
          },
        })
      : query(GET_ORG_PROJECT_INFO, {
          variables: {
            login: login,
            number: parseInt(number),
          },
        });

  let project;

  $: {
    if ($projectInfo.data) {
      project =
        type === "repo"
          ? $projectInfo.data.repository.project
          : $projectInfo.data.organization.project;
      console.log(project);
    }
  }
</script>

{#if $projectInfo.loading}
  Loading...
{:else if $projectInfo.error}
  Error: {$projectInfo.error.message}
{:else}
  <h2>{project.name}</h2>
  <h2>{project.body}</h2>
  {#each project.columns.nodes as column}
    <h3>{column.name}</h3>
    {#each column.cards.nodes as card}
      {#if card.note}
        <p>{card.note}</p>
      {/if}
    {/each}
  {/each}
{/if}
