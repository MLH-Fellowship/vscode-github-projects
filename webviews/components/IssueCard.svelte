<script>
  export let card_info, handlers;
  const deleteCard = () => {
    handlers.cardMutations(card_info, "deleteCard");
  };

  const archiveCard = () => {
    handlers.cardMutations(card_info, "editCard", { switchArchive: true });
  }

</script>

<div>
  <div style="display:flex; flex-direction: row; margin-top:5px;">
    <button on:click={deleteCard} style="margin-right:5px;"> Delete </button>
    <button on:click={archiveCard} > Archive </button>
  </div>
</div>
