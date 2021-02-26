<script>
  const deleteCard = () => {
    //add mutation for deleting card
  };

  const archiveCard = () => {
    //add mutation to archive card
  }

</script>

<div>
  <div style="display:flex; flex-direction: row; margin-top:5px;">
    <button on:click={deleteCard} style="margin-right:5px;"> Delete </button>
    <button on:click={archiveCard} > Archive </button>
  </div>
</div>
