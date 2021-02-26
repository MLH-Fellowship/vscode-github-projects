<script>
  import { getContext, createEventDispatcher } from "svelte";
  import EditField from "./EditField.svelte";
  import ConvertIssue from "./ConvertIssue.svelte";
  export let note, card_info, column_info, handlers;

  const { open } = getContext("simple-modal");
  const dispatch = createEventDispatcher();

  const edit_card = () => {
    //open popup
    open(
      EditField,
      {handlers: handlers, message: {note, card_info, column_info} },
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
    open(ConvertIssue,
    { handlers: handlers, message: {note, card_info, column_info} },
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
    handlers.cardMutations(card_info, "deleteCard");
  };

  const archiveCard = () => {
    handlers.cardMutations(card_info, "editCard", { switchArchive: true });
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
