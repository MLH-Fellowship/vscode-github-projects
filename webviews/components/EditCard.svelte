<script>
  import { getContext, createEventDispatcher } from "svelte";
  import EditField from "./EditField.svelte";
  import ConvertIssue from "./ConvertIssue.svelte";
  export let note, card_info;

  const { open } = getContext("simple-modal");
  const dispatch = createEventDispatcher();

  const edit_card = () => {
    //card_info is the card
    //open popup
    open(
      EditField,
      { message: {note, card_info} },
      { closeButton: "" },
      {
        onOpen: () => {
          dispatch("message", {
            payload: "stopDrag",
          });
        },
        onClose: () => {
          dispatch("message", {
            payload: "startDrag",
          });
        },
      }
    );
  };

  const convertToIssue = () => {
    //card_info is the card
    //note is the title for the card.
    open(ConvertIssue,
    { message: {note, card_info} },
    { closeButton: "" },
    {
        onOpen: () => {
          dispatch("message", {
            payload: "stopDrag",
          });
        },
        onClose: () => {
          dispatch("message", {
            payload: "startDrag",
          });
        },
      }
    );
  }

  const deleteCard = () => {
    //card_info is the card here
    //add mutation for deleting card
  };

  const archiveCard = () => {
    //card_info is the card here
    //add mutation to archive card
  }

</script>

<div>
  <div style="display:flex; flex-direction: row; margin-top:5px;">
    <button on:click={edit_card} style="margin-right:5px;">Edit</button>
    <button on:click={deleteCard} style="margin-right:5px;"> Delete </button>
    <button on:click={archiveCard} style="margin-right:5px;"> Archive </button>
    <button on:click={convertToIssue}>Convert to Issue</button>
  </div>
</div>
