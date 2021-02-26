<script>
  import { getContext } from 'svelte';
  import AddColumn from './AddColumn.svelte';
  export let handlers, project;

  const { open } = getContext('simple-modal');

  const add_col = () => {
    open(AddColumn, { handlers: handlers, project: project }, {closeButton: ""});
  };
</script>

<p><button on:click={add_col} style="width: 14rem; margin: 0 8px;"> Add a Column </button></p>