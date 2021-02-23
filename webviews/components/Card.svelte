<script>
  export let card;
</script>

<div
  style="border-style: solid;
        border-color: white;
        border-width: 1px;
        border-radius: 5px;
        padding: 1rem 1rem 1rem 1rem;
        margin-top: 1rem;"
>
  {#if card.note}
    <div>
      <p>{card.note}</p>
    </div>
  {:else if card.content && card.content.title}
    <p>{card.content.title}</p>
  {/if}
</div>
