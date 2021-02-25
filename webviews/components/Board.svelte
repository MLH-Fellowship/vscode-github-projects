<script>
  import Card from "./Card.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { createEventDispatcher } from 'svelte';
  import Modal from 'svelte-simple-modal';
  import Content from './Content.svelte';
  export let allColumns;

  let filteredColumns = [];

  $: {
    filteredColumns = [];
    for (let column of allColumns) {
      if (column.cards) {
        column.cards = column.cards.filter((card) => !card.isArchived);
        filteredColumns.push(column);
      }
    }
  }

  const dispatch = createEventDispatcher();

  function handleConsiderColumns(e) {
    dispatch('message', {
			payload: 'stopPoll'
		});
    filteredColumns = e.detail.items;
  }

  function handleFinalizeColumns(e) {
    dispatch('message', {
			payload: 'startPoll'
		});
    filteredColumns = e.detail.items;
  }

  function handleConsiderCards(colId, e) {
    dispatch('message', {
			payload: 'stopPoll'
		});
    const colIndex = filteredColumns.findIndex((column) => column.id === colId);
    filteredColumns[colIndex].cards = e.detail.items;
    filteredColumns = [...filteredColumns];
  }

  function handleFinalizeCards(colId, e) {
    dispatch('message', {
			payload: 'startPoll'
		});
    const colIndex = filteredColumns.findIndex((column) => column.id === colId);
    filteredColumns[colIndex].cards = e.detail.items;
    filteredColumns = [...filteredColumns];
  }
</script>

<div>
  <div style="display: flex; flex-direction: row; justify-content: flex-end; margin: 10px;">
    <button style="width: 20%; margin:5px;"> View in GitHub </button>
    <button style="width: 20%; margin:5px;"> Close Project </button>
  </div>
  <div
    style="display: flex; flex-direction: row;"
    use:dndzone={{ items: filteredColumns, type: "columns" }}
    on:consider={handleConsiderColumns}
    on:finalize={handleFinalizeColumns}
  >
    {#each filteredColumns as column (column.id)}
      <div
        style="border-style: solid;
          border-color: white;
          border-width: 1px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          padding: 1rem 1rem 1rem 1rem;
          margin-right: 1rem;
          min-width: 20rem;
          overflow-y: hidden;
          min-height: 30rem;
          max-height: 100%"
      >
        <h2>{column.name}</h2>
        <div
          style="height: 100%;
        overflow-y: scroll;
        min-height: 30rem;"
          use:dndzone={{ items: column.cards }}
          on:consider={(e) => handleConsiderCards(column.id, e)}
          on:finalize={(e) => handleFinalizeCards(column.id, e)}
        >
          {#if column.cards}
            {#each column.cards as card (card.id)}
              <Card {card} />
            {/each}
          {/if}
        </div>
        <Modal>
          <Content />
        </Modal>
      </div>
    {/each}
  </div>
</div>
