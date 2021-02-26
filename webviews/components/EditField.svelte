<script>
  import { getContext } from 'svelte';
  export let message;
  const { close } = getContext('simple-modal');
  let text = message.note;

  const closeAdd = () => {
    console.log(message.card_info);
    //message.column_info is the column
    //message.card_info is the card
    //add mutations for editing card
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