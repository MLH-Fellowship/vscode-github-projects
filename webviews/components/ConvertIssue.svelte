<script>
  import { getContext } from 'svelte';
  export let message;
  const { close } = getContext('simple-modal');
  let body = ""

  const convertIssue = () => {
    //body is issue body and message.note is title
    //message.card_info is the card
    //message.column_info is the column
    //add mutations for converting to issue
    console.log(message.card_info);
    close();
  };
</script>

<div>
  <input bind:value={body} placeholder="Add a body for issue" />
  <div style="display: flex; flex-direction: row; width: 100%;">
    <button on:click={convertIssue} style="width:50%; margin-right: 5px;">
      Confirm
    </button>
    <button on:click={convertIssue} style="width:50%">
      Cancel
    </button>
  </div>
</div>