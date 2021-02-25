<script>
  import { getContext } from 'svelte';
  import EditField from './EditField.svelte';

  const { open } = getContext('simple-modal');

  const edit_card = () => {
    open(EditField, { message: "" }, {closeButton: ""});
  };

  const deleteCard = () => {
    //add mutation for deleting card
  }
</script>

<div>
  
  <div style=" display:flex; flex-direction: row; margin:5px;">
    <button on:click={edit_card}>Edit Card</button>
    <button on:click={deleteCard}>
      Delete
    </button>
  </div>
</div>