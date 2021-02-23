<script>
    import Card from "./Card.svelte";

    export let columns;
</script>

<div style="display: flex; flex-direction: row;">
    {#each columns as column}
      <div
        style="border-style: solid;
        border-color: white;
        border-width: 1px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        padding: 1rem 1rem 1rem 1rem;
        margin-right: 1rem;
        min-width: 15rem;"
      >
        <h2>{column.name}</h2>
        {#if column.cards}
          {#each column.cards as card}
            {#if !card.isArchived}
              <Card card={card} />
            {/if}
          {/each}
        {/if}
      </div>
    {/each}
  </div>