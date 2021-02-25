<script>
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');
  let text = ""

  const closeAdd = () => {
    console.log(text);
    //add mutations for adding card
    close();
  };
</script>

<div>
  <form on:submit|preventDefault>
    <input bind:value={text} />
    <button on:click={closeAdd} type="submit">
      Confirm
    </button>
  </form>
</div>