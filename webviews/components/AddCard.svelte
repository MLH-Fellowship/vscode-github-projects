<script>
  import { getContext } from 'svelte';
  export let message, handlers;
  const { close } = getContext('simple-modal');
  let text = ""

  const closeAdd = () => {
    handlers.cardMutations(null, "addCard", { note: text, colId: message.id });
    close();
  };

  const closePop = () => {
    close();
  };

</script>

<div>
  <input bind:value={text} placeholder="Add a note" />
  <div style="display: flex; flex-direction: row; width: 100%;">
    <button on:click={closeAdd} style="width:50%; margin-right: 5px;">
      Confirm
    </button>
    <button on:click={closePop} style="width:50%">
      Cancel
    </button>
  </div>
</div>