<script>
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

  window.addEventListener("message", async (event) => {
    const message = event.data;

    switch (message.command) {
      case "authComplete":
        session = message.payload.session;
        break;
      case "projectChosen":
        project = message.payload.project;
        break;
    }
  });
  // send message as soon as sidebar loads.
  ext_vscode.postMessage({ type: "onSignIn", value: "success" });
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
  <h3>Project</h3>
  <h4>{project.name}</h4>
  <h3>Collaborators</h3>
  <h4>WIP</h4>
  <h4>WIP</h4>
  <h4>WIP</h4>
{/if}
