<script>
  import { getContext } from "svelte";
  export let message;
  import Check from "svelte-material-icons/Check.svelte";
  import Close from "svelte-material-icons/Close.svelte";

  const { close } = getContext("simple-modal");
  let text = message;

  const closeAdd = () => {
    console.log(text);
    //add mutations for editing card
    close();
  };

  const closePop = () => {
    close();
  };
</script>

<div>
  <input bind:value={text} />
  <div
    style="display: flex; flex-direction: row; justify-content: space-around;"
  >
    <div on:click={closeAdd} style="cursor: pointer;">
      <Check height="20" width="20" />
    </div>
    <div on:click={closePop} style="cursor: pointer;">
      <Close height="20" width="20" />
    </div>
  </div>
</div>
