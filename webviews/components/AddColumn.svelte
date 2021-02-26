<script>
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');
  let text = "" //column name

  const closeAdd = () => {
    console.log(text);
    //add mutations for adding column
    close();
  };
</script>

<div>
  <input bind:value={text} placeholder="Add column Name" />
  <div style="display: flex; flex-direction: row; width: 100%;">
    <button on:click={closeAdd} style="width:50%; margin-right: 5px;">
      Confirm
    </button>
    <button on:click={closeAdd} style="width:50%">
      Cancel
    </button>
  </div>
</div>