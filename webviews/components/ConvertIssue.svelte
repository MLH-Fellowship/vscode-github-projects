<script>
  import { getContext } from 'svelte';
  export let message, handlers;
  const { close } = getContext('simple-modal');
  let body = ""

  const convertIssue = () => {
    handlers.cardMutations(message.card_info, "convertCardToIssue", {body: body, title: message.note});
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