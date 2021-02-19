<script>
</script>

<div>
  <p>Sign in with GitHub to get started.</p>
  <button
    on:click={ 
      () => { //send message to SidebarProvider.ts
        ext_vscode.postMessage({type: 'onSignIn', value: 'success'});
      }
    }
  > Sign in with GitHub </button>
</div>
