<script>
  import { gql } from "@apollo/client";
  import { query } from "svelte-apollo";
  import Board from "./Board.svelte"

  const GET_REPO_PROJECT_INFO = gql`
    query GetRepoProjectInfo($name: String!, $owner: String!, $number: Int!) {
      repository(name: $name, owner: $owner) {
        project(number: $number) {
          name
          body
          columns(first: 100) {
            nodes {
              name
              id
              cards(first: 100) {
                nodes {
                  content {
                    ...fieldsIssue
                    ...fieldsPR
                  }
                  note
                  isArchived
                  state
                  id
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

    fragment fieldsIssue on Issue {
      title
    }

    fragment fieldsPR on PullRequest {
      title
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
              id
              cards(first: 100) {
                nodes {
                  content {
                    ...fieldsIssue
                    ...fieldsPR
                  }
                  note
                  isArchived
                  state
                  id
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

    fragment fieldsIssue on Issue {
      title
    }

    fragment fieldsPR on PullRequest {
      title
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
          // pollInterval: 1800,
        })
      : query(GET_ORG_PROJECT_INFO, {
          variables: {
            login: login,
            number: parseInt(number),
          },
          // pollInterval: 1800,
        });

  let project;

  let columns = [];

  $: {
    if ($projectInfo.data) {
      project =
        type === "repo"
          ? $projectInfo.data.repository.project
          : $projectInfo.data.organization.project;

      if (project.columns) {
        columns = project.columns.nodes.map((column) => ({
          name: column.name,
          cards: column.cards ? column.cards.nodes : null,
          id: column.id,
        }));
      }
    }
  }
</script>

{#if $projectInfo.loading}
  Loading...
{:else if $projectInfo.error}
  Error: {$projectInfo.error.message}
{:else}
  <h1>{project.name}</h1>
  <h2>{project.body}</h2>
  <Board allColumns={columns} />
{/if}
