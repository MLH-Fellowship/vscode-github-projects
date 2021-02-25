<script>
  import { gql } from '@apollo/client';
  import { query } from 'svelte-apollo';
  import { createEventDispatcher, onMount } from 'svelte';

  import Dropdown from 'sv-bootstrap-dropdown';
  let dropdownTrigger;

  import { bar } from './Sidebar.svelte';

  onMount(function () {
    console.log(bar);
  });

  let filterValue = 'initial value';

  const dispatch = createEventDispatcher();

  const GET_CONTAINER_WITH_PROJECT = gql`
    query GetContainerWithProject {
      viewer {
        organizations(first: 100) {
          nodes {
            id
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
            id
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
    // console.log('containers info is ', $containersInfo);
    if ($containersInfo.data) {
      if ($containersInfo.data.viewer.organizations) {
        for (let organization of $containersInfo.data.viewer.organizations
          .nodes) {
          let newOrg = addType(organization, 'org');
          containers = [...containers, newOrg];
        }
      }
      if ($containersInfo.data.viewer.repositories) {
        for (let repo of $containersInfo.data.viewer.repositories.nodes) {
          let newRepo = addType(repo, 'repo');
          containers = [...containers, newRepo];
          // console.log(newRepo);
        }
      }
    }
  }

  function handleSelectProject(container, project) {
    dispatch('message', {
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
  <Dropdown triggerElement={dropdownTrigger}>
    <button type="button" class="dropDownButton" bind:this={dropdownTrigger}>
      <span>Dropdown</span>
    </button>
    <div slot="DropdownMenu">
      <span>
        <button
          on:click={() => {
            filterValue = 'Repository';
          }}
          class="dropDownButtonSecond">Repository</button
        >
      </span>
      <span>
        <button
          on:click={() => {
            filterValue = 'Organization';
          }}
          class="dropDownButtonSecond">Organization</button
        >
      </span>
      <span>
        <button
          on:click={() => {
            filterValue = 'projectOpen';
          }}
          class="dropDownButtonSecond">Open Projects</button
        >
      </span>
      <span>
        <button
          on:click={() => {
            filterValue = 'projectClosed';
          }}
          class="dropDownButtonSecond">Closed Projects</button
        >
      </span>
    </div>
  </Dropdown>
  {#each containers.filter((c) => c.__typename == filterValue || filterValue == 'projectOpen' || filterValue == 'projectClosed' || filterValue == 'initial value') as container}
    <h3>{container.name}</h3>
    {#if container.projects}
      {#each container.projects.nodes as project}
        {#if (filterValue == 'initial value' || filterValue == 'projectOpen') && !project.closed}
          <button on:click={handleSelectProject(container, project)}
            >{project.name}</button
          >
        {/if}
        {#if filterValue == 'projectClosed' && project.closed}
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
