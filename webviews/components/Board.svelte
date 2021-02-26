<script>
  import Card from "./Card.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { createEventDispatcher } from "svelte";
  import Modal from "svelte-simple-modal";
  import Content from "./Content.svelte";
  import AddCol from "./AddCol.svelte";

  export let allColumns;

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

  let cardsOpen = 0;

  function handleMessage(event) {
    if (event.detail.payload === "stopDrag") {
      cardsOpen--;
    } else if (event.detail.payload === "startDrag") {
      cardsOpen++;
    }
    if (cardsOpen == 0) {
      draggable = true;
    } else {
      draggable = false;
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
      <div class="project-column">
        <h2>{column.name}</h2>
        <div
          style="height: 100%;
        overflow-y: scroll;
        min-height: 30rem;
        margin-bottom: 0.4rem"
          use:dndzone={{ items: column.cards, dragDisabled: !draggable }}
          on:consider={(e) => handleConsiderCards(column.id, e)}
          on:finalize={(e) => handleFinalizeCards(column.id, e)}
        >
          {#if column.cards}
            {#each column.cards as card (card.id)}
              <Card {card} on:message={handleMessage} />
            {/each}
          {/if}
        </div>
        <Modal>
          <Content />
        </Modal>
      </div>
    {/each}
  </div>
  <Modal>
    <AddCol />
  </Modal>
</div>
