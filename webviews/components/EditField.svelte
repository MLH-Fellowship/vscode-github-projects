<script>
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');
  let text = ""

  const closeAdd = () => {
    console.log(text);
    //add mutations for editing card
    close();
  };
</script>

<div>
  <input bind:value={text} />
  <button on:click={closeAdd}>
    Edit
  </button>
</div>