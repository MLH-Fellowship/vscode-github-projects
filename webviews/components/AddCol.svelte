<script>
  import { getContext } from 'svelte';
  import AddColumn from './AddColumn.svelte';
  export let handlers;

  const { open } = getContext('simple-modal');

  const add_col = () => {
    open(AddColumn, { handlers: handlers, message: "" }, {closeButton: ""});
  };
</script>

<p><button on:click={add_col} style="width: 100%; margin: 0 8px;"> Add a Column </button></p>