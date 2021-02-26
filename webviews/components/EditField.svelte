<script>
  import { getContext } from 'svelte';
  export let message, handlers;
  const { close } = getContext('simple-modal');
  let text = message.note;

  const closeAdd = () => {
    handlers.cardMutations(message.card_info, "editCard", { note: text });
    close();
  };

  const closePop = () => {
    close();
  }
</script>

<div>
  <input bind:value={text} />
  <div style="display: flex; flex-direction: row;">
    <button on:click={closeAdd}
    style="width:50%; margin-right: 5px;"
    >
      Confirm
    </button>
    <button on:click={closePop}
    style="width: 50%;"
    >
      Cancel
    </button>
  </div>
</div>