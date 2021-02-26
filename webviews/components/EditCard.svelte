<script>
  import { getContext } from 'svelte';
  import EditField from './EditField.svelte';
  export let note;

  const { open } = getContext('simple-modal');

  const edit_card = () => {
    //open popup
    open(EditField, { message: note}, {closeButton: ""});
  };

  const deleteCard = () => {
    //add mutation for deleting card
  }
</script>

<div>
  
  <div style="display:flex; flex-direction: row; margin-top:5px;">
    <button on:click={edit_card} style="margin-right:5px;">Edit</button>
    <button on:click={deleteCard} style="margin-right:5px;">
      Delete
    </button>
    <button on:click={deleteCard}>
      Archive
    </button>
  </div>
</div>