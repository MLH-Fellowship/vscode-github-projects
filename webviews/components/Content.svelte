<script>
  import { getContext } from 'svelte';
  import AddCard from './AddCard.svelte';

  const { open } = getContext('simple-modal');

  const showSurprise = () => {
    open(AddCard, { message: "Add Card" }, {closeButton: ""});
  };
</script>

<p><button on:click={showSurprise} style="width: 100%; margin-top: 5px;">Add Card</button></p>