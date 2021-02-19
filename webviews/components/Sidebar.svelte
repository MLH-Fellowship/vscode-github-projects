<script>
  $: session = null;

  window.addEventListener("message", async (event) => {
    const message = event.data;
    switch (message.command) {
      case "authComplete":
        session = message.payload.session;
    }
  });
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
{:else}
  <button
    on:click={() => {
      //send message to SidebarProvider.ts
      ext_vscode.postMessage({ type: "onSignIn", value: "success" });
    }}
  >
    See Projects
  </button>
{/if}
