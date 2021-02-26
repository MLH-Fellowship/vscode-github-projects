<script>
  import Board from "./Board.svelte";
  import { mutation, query } from "svelte-apollo";
  import { createEventDispatcher } from "svelte";
  import * as queries from "./queries.js";
  import KeyboardBackspace from "svelte-material-icons/KeyboardBackspace.svelte";

  export let type, name, owner, login, number;

  const dispatch = createEventDispatcher();

  const projectInfo =
    type === "repo"
      ? query(queries.GET_REPO_PROJECT_INFO, {
          variables: {
            name: name,
            owner: owner,
            number: parseInt(number),
          },
          pollInterval: 1800,
        })
      : type === "org"
      ? query(queries.GET_ORG_PROJECT_INFO, {
          variables: {
            login: login,
            number: parseInt(number),
          },
          pollInterval: 1800,
        })
      : query(queries.GET_USER_PROJECT_INFO, {
          variables: {
            number: parseInt(number),
          },
          pollInterval: 1800,
        });

  let project;
  let repoId;

  let columns = [];

  $: {
    if ($projectInfo.data) {
      project =
        type === "repo"
          ? $projectInfo.data.repository.project
          : type === "org"
          ? $projectInfo.data.organization.project
          : $projectInfo.data.viewer.project;

      if (project.columns) {
        columns = project.columns.nodes.map((column) => ({
          name: column.name,
          cards: column.cards ? column.cards.nodes : null,
          id: column.id,
        }));
      }

      repoId = type === "repo" ? $projectInfo.data.repository.id : null;
    }
  }

  function handleMessage(event) {
    if (event.detail.payload === "stopPoll") {
      projectInfo.stopPolling();
    } else if (event.detail.payload === "startPoll") {
      projectInfo.startPolling(1800);
    }
  }

  // Card mutations
  const addCard = mutation(queries.ADD_CARD);
  const deleteCard = mutation(queries.DELETE_CARD);
  const editCard = mutation(queries.EDIT_CARD);
  const switchCardColumn = mutation(queries.SWITCH_CARD_COLUMN);
  const convertCardToIssue = mutation(queries.CONVERT_CARD_TO_ISSUE);

  // Column mutations
  const addColumn = mutation(queries.ADD_COLUMN);
  const deleteColumn = mutation(queries.DELETE_COLUMN);
  const editColumn = mutation(queries.EDIT_COLUMN);

  // Project mutations
  const addProject = mutation(queries.ADD_PROJECT);
  const closeProject = mutation(queries.CLOSE_PROJECT);
  const editProject = mutation(queries.EDIT_PROJECT);

  async function handleCardMutations(card, request, payload) {
    try {
      switch (request) {
        case "addCard":
          // TODO: Use ContentID to link card to an Issue or a PR
          addCard({
            variables: {
              contentId: null,
              note: payload.note,
              projectColumnId: payload.colId,
            },
          });
          break;

        case "deleteCard":
          deleteCard({ variables: { cardId: card.id } });
          break;

        case "editCard":
          let isArchived = card.isArchived;
          if (payload.switchArchive) {
            isArchived = !isArchived;
          }
          if (payload.override != undefined) {
            isArchived = payload.override;
          }
          editCard({
            variables: {
              isArchived: isArchived,
              note: payload.note,
              projectCardId: card.id,
            },
          });
          break;

        case "switchCardColumn":
          // TODO: This is untested, use payload to add a `toColumn` parameter
          switchCardColumn({
            variables: {
              afterCardId: null,
              cardId: card.id,
              columnId: payload.toColumn.id,
            },
          });
          break;

        case "convertCardToIssue":
          if (!repoId) {
            throw Error("Cannot convert non-repository cards to issues.");
          }
          let title = null;
          if (payload.title) {
            title = payload.title;
          }
          convertCardToIssue({
            variables: {
              body: payload.body,
              projectCardId: card.id,
              repositoryId: repoId,
              title: title,
            },
          });
          break;

        default:
          break;
      }
    } catch (error) {
      // TODO: this throws an error:
      // ext_vscode.postMessage({ type: "onError", value: error.message });
      console.log(error.message);
    }
  }

  // override variable for archiving
  let overrideArchived = false;
  async function handleColumnMutations(column, request, payload) {
    try {
      switch (request) {
        case "addColumn":
          addColumn({
            variables: { name: payload.name, projectId: payload.projId },
          });
          break;

        case "deleteColumn":
          deleteColumn({ variables: { columnId: column.id } });
          break;

        case "editColumn":
          editColumn({
            variables: { name: payload.name, projectColumnId: column.id },
          });
          break;

        case "switchColumnArchive":
          overrideArchived = !overrideArchived;
          column.cards.nodes.forEach((card) => {
            let archivePayload = { override: overrideArchived };
            handleCardMutations(card, "editCard", archivePayload);
          });
          break;

        default:
          break;
      }
    } catch (error) {
      // TODO: this throws an error:
      // ext_vscode.postMessage({ type: "onError", value: error.message });
      console.log(error.message);
    }
  }

  async function handleProjectMutations(project, request, payload) {
    try {
      switch (request) {
        case "addProject":
          addProject(payload);
          break;

        case "closeProject":
          closeProject(project);
          break;

        case "editProject":
          editProject(project, payload);
          break;

        default:
          break;
      }
    } catch (error) {
      // TODO: this throws an error:
      // ext_vscode.postMessage({ type: "onError", value: error.message });
      console.log(error.message);
    }
  }

  function handleBackPressed() {
    dispatch("message", {
      container: null,
      project: null,
    });
  }
</script>

{#if $projectInfo.loading}
  Loading...
{:else if $projectInfo.error}
  Error: {$projectInfo.error.message}
{:else}
  <div on:click={handleBackPressed} style="cursor: pointer; width: 25px">
    <KeyboardBackspace width="25" height="25" />
  </div>

  <div
    style="display: flex; flex-direction: row; justify-content: space-between; overflow-x: scroll;"
  >
    <div style="display: flex; flex-direction: column">
      <h1>{project.name}</h1>
      <h2>{project.body}</h2>
    </div>
    <div
      style="display: flex; flex-direction: row; justify-content: flex-start; margin:16px 0px;"
    >
      <button style="min-width: 7rem; margin-right:8px;">
        View in GitHub
      </button>
      <button style="min-width: 7rem;"> Close Project </button>
    </div>
  </div>

  <Board allColumns={columns} handlers={{"cardMutations": handleCardMutations, "columnMutations": handleColumnMutations, "projectMutations": handleProjectMutations}} on:message={handleMessage} />
{/if}
