<script>
  let filterInclude = ['Repository'];

  let menu = ['Repository', 'Organization', 'Open Project', 'Closed Project'];

  function join(filterInclude) {
    if (filterInclude.length === 1) return filterInclude[0];
    return `${filterInclude.slice(0, -1).join(', ')} and ${
      filterInclude[filterInclude.length - 1]
    }`;
  }

  $: session = null;

  window.addEventListener('message', async (event) => {
    const message = event.data;
    switch (message.command) {
      case 'authComplete':
        session = message.payload.session;
    }
  });
  // send message as soon as sidebar loads.
  ext_vscode.postMessage({ type: 'onSignIn', value: 'success' });
</script>

{#if !session}
  <div>
    <p>Sign in with GitHub to get started.</p>
    <button
      on:click={() => {
        //send message to SidebarProvider.ts
        ext_vscode.postMessage({ type: 'onSignIn', value: 'success' });
      }}
    >
      Sign in with GitHub
    </button>
  </div>
{:else}
  <div>
    <button
      on:click={() => {
        //send message to SidebarProvider.ts
        ext_vscode.postMessage({ type: 'onSignIn', value: 'noNotification' });
      }}
      class="seeProjectsButton"
    >
      See Projects
    </button>

    {#each menu as flavour}
      <label class="labels">
        <input
          type="checkbox"
          bind:group={filterInclude}
          value={flavour}
          on:click={() => {
            console.log(join(filterInclude));
          }}
          class="checkBox"
        />
        {flavour}
      </label>
    {/each}
  </div>
{/if}
