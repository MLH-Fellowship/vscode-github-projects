<script>
  import { getContext } from "svelte";
  export let message;
  import Check from "svelte-material-icons/Check.svelte";
  import Close from "svelte-material-icons/Close.svelte";

  const { close } = getContext("simple-modal");
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
  };
</script>

<div style="margin-top: 0.4rem">
  <input bind:value={text} />
  <div
    style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 0.4rem"
  >
    <div on:click={closeAdd} style="cursor: pointer;">
      <Check height="20" width="20" />
    </div>
    <div on:click={closePop} style="cursor: pointer;">
      <Close height="20" width="20" />
    </div>
  </div>
</div>
