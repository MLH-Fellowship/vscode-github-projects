<script>
  import Card from "./Card.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { createEventDispatcher } from "svelte";
  import Modal from "svelte-simple-modal";
  import AddCardContent from "./AddCardContent.svelte";
  import AddCol from "./AddCol.svelte";

  export let allColumns;
  export let handlers;

  let prevColumns = [];
  let filteredColumns = [];

  let draggable = true;

  $: {
    if (prevColumns !== allColumns) {
      prevColumns = allColumns;
      filteredColumns = [];
      for (let column of allColumns) {
        if (column.cards) {
          column.cards = column.cards.filter((card) => !card.isArchived);
          filteredColumns.push(column);
        }
      }
    }
  }

  const dispatch = createEventDispatcher();

  function handleConsiderColumns(e) {
    dispatch("message", {
      payload: "stopPoll",
    });
    filteredColumns = e.detail.items;
  }

  function handleFinalizeColumns(e) {
    dispatch("message", {
      payload: "startPoll",
    });
    filteredColumns = e.detail.items;
  }

  function handleConsiderCards(colId, e) {
    dispatch("message", {
      payload: "stopPoll",
    });

    const colIndex = filteredColumns.findIndex((column) => column.id === colId);

    filteredColumns[colIndex].cards = e.detail.items;
    filteredColumns = [...filteredColumns];
  }

  function handleFinalizeCards(colId, e) {
    dispatch("message", {
      payload: "startPoll",
    });

    const colIndex = filteredColumns.findIndex((column) => column.id === colId);

    filteredColumns[colIndex].cards = e.detail.items;
    filteredColumns = [...filteredColumns];
  }

  function handleMessage(event) {
    if (event.detail.payload === "stopDrag") {
      draggable = false;
    } else if (event.detail.payload === "startDrag") {
      draggable = true;
    }
  }
</script>

<div
  style="display: flex; flex-direction: row; justify-content: flex-start; margin:16px 0px;"
>
  <button style="width: 20%; margin-right:8px;"> View in GitHub </button>
  <button style="width: 20%;"> Close Project </button>
</div>
<div style="display: flex; flex-direction: row; overflow-x:scroll;">
  <div
  style="display: flex; flex-direction: row;"
    use:dndzone={{
      items: filteredColumns,
      type: "columns",
      dragDisabled: !draggable,
    }}
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
        overflow-y: hidden;
        min-height: 30rem;
        max-height: 100%;
        min-width: 20rem;
        width:25%;"
      >
        <h2>{column.name}</h2>
        <div
          style="height: 100%;
        overflow-y: scroll;
        min-height: 30rem;"
          use:dndzone={{ items: column.cards, dragDisabled: !draggable }}
          on:consider={(e) => handleConsiderCards(column.id, e)}
          on:finalize={(e) => handleFinalizeCards(column.id, e)}
        >
          {#if column.cards}
            {#each column.cards as card (card.id)}
              <Card {card} {column} {handlers} on:message={handleMessage} />
            {/each}
          {/if}
        </div>
        <Modal>
          <AddCardContent {column} {handlers}/>
        </Modal>
      </div>
    {/each}
    <Modal>
      <AddCol {handlers} />
    </Modal>
  </div>
</div>
