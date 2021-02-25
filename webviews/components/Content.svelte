<script>
  import { getContext } from 'svelte';
  import AddCard from './AddCard.svelte';

  const { open } = getContext('simple-modal');

  const showSurprise = () => {
    open(AddCard, { message: "Add Card" }, {closeButton: ""});
  };
</script>

<p><button on:click={showSurprise}>Add Card</button></p>