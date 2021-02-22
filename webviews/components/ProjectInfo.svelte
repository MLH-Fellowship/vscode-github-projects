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
                  content {
                    ...fieldsIssue
                    ...fieldsPR
                  }
                  note
                  isArchived
                  state
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
              cards(first: 100) {
                nodes {
                  content {
                    ...fieldsIssue
                    ...fieldsPR
                  }
                  note
                  isArchived
                  state
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
          pollInterval: 1800,
        })
      : query(GET_ORG_PROJECT_INFO, {
          variables: {
            login: login,
            number: parseInt(number),
          },
          pollInterval: 1800,
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
  <h1>{project.name}</h1>
  <h2>{project.body}</h2>
  <div style="display: flex; flex-direction: row;">
    {#each project.columns.nodes as column}
      <div
        style="border-style: solid;
      border-color: white;
      border-width: 1px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      padding: 1rem 1rem 1rem 1rem;
      margin-right: 1rem;
      min-width: 15rem;"
      >
        <h2>{column.name}</h2>
        {#each column.cards.nodes as card}
          {#if !card.isArchived}
            <div
              style="border-style: solid;
        border-color: white;
        border-width: 1px;
        border-radius: 5px;
        padding: 1rem 1rem 1rem 1rem;
        margin-top: 1rem;"
            >
              {#if card.note}
                <div>
                  <p>{card.note}</p>
                </div>
              {:else if card.content && card.content.title}
                <p>{card.content.title}</p>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
{/if}
