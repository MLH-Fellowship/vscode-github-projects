<script>
  import Modal from "svelte-simple-modal";
  import EditCard from "./EditCard.svelte";
  import IssueCard from "./IssueCard.svelte";
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
      <Modal>
        <EditCard note={card.note} on:message/>
      </Modal>
    </div>
  {:else if card.content && card.content.title}
    <div style="display: flex; flex-direction: row; width: 100%; justify-content: space-between;">
      <p>{card.content.title}</p>
      <span style= "height: 5%; border-style: solid; border-radius: 5px; padding:0 5px 0 5px;"><a style="text-decoration: none" href={card.content.url}>{card.content.__typename}</a></span>
    </div>
    <Modal>
      <IssueCard note={card.content.title} on:message/>
    </Modal>
  {/if}
</div>
