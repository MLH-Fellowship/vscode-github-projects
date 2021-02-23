<script>
  import { mutation, query } from "svelte-apollo";
  import * as queries from "./queries.js";

  export let type, name, owner, login, number;

  const projectInfo =
    type === "repo"
      ? query(queries.GET_REPO_PROJECT_INFO, {
          variables: {
            name: name,
            owner: owner,
            number: parseInt(number),
          },
          pollInterval: 100,
        })
      : query(queries.GET_ORG_PROJECT_INFO, {
          variables: {
            login: login,
            number: parseInt(number),
          },
          pollInterval: 100,
        });

  let project;
  let repoId;

  $: {
    if ($projectInfo.data) {
      project =
        type === "repo"
          ? $projectInfo.data.repository.project
          : $projectInfo.data.organization.project;
      repoId = 
        type === "repo"
          ? $projectInfo.data.repository.id
          : null
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
  const switchColumnArchive = mutation(queries.SWITCH_COLUMN_ARCHIVE);
  const deleteColumnCard = mutation(queries.DELETE_COLUMN_CARD);

  // Project mutations
  const addProject = mutation(queries.ADD_PROJECT);
  const closeProject = mutation(queries.CLOSE_PROJECT);
  const editProject = mutation(queries.EDIT_PROJECT);


  async function handleCardMutations(card, request, payload) {
    try {
      switch (request) {
        case "addCard":
          // TODO: Use ContentID to link card to an Issue or a PR
          addCard({ variables: { contentId: null, note: payload.note, projectColumnId: payload.column.id}});
          break;

        case "deleteCard":
          deleteCard({ variables: { cardId: card.id }});
          break;

        case "editCard":
          let isArchived = card.isArchived;
          if(payload.switchArchive) {
            isArchived = !isArchived;
          }
          if(payload.override != undefined) {
            isArchived = payload.override;
          }
          editCard({ variables: { isArchived: isArchived, note: payload.note, projectCardId: card.id}});
          break;

        case "switchCardColumn":
          // TODO: This is untested, use payload to add a `toColumn` parameter
          switchCardColumn({ variables: { afterCardId: null, cardId: card.id, columnId: payload.toColumn.id }});
          break;

        case "convertCardToIssue":
          if(!repoId) {
            throw Error("Cannot convert non-repository cards to issues.");            
          }
          let title = null;
          if(payload.title) { 
            title = payload.title;
          }
          convertCardToIssue({ variables: { body: payload.body, projectCardId: card.id, repositoryId: repoId, title: title}});
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
          addColumn({ variables: { name: payload.name, projectId: payload.project.id }});
          break;

        case "deleteColumn":
          deleteColumn({ variables: { columnId: column.id }});
          break;

        case "editColumn":
          editColumn({ variables: { name: payload.name, projectColumnId: column.id }});
          break;

        case "switchColumnArchive":
          overrideArchived = !overrideArchived;
          column.cards.nodes.forEach(card => {
            let archivePayload = {"override" : overrideArchived};
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
</script>

{#if $projectInfo.loading}
  Loading...
{:else if $projectInfo.error}
  Error: {$projectInfo.error.message}
{:else}
  <h2>{project.name}</h2>
  <h2>{project.body}</h2>
  <div style="display: flex; flex-direction: row;">
    <button style="width=20px" on:click="{handleColumnMutations(null, "addColumn", {"project": project, "name": "Get this from user."})}">Add Column</button>
    {#each project.columns.nodes as column}
      <div
        style="border-style: solid; border-color: white; border-width: 1px; border-radius: 5px; display: flex; flex-direction: column; margin-right: 1rem"
      >
        <button on:click="{handleColumnMutations(column, "deleteColumn")}">Delete Column</button>
        <button on:click="{handleColumnMutations(column, "switchColumnArchive")}">Switch Archive</button>
        <button on:click="{handleColumnMutations(column, "editColumn", {"name": "Get this from user."})}">Edit Column</button>
        <h2>{column.name}</h2>
        <button on:click="{handleCardMutations(null, "addCard", {"column": column, "note": "Get this from user."})}">Add Card</button>
        {#each column.cards.nodes as card}
          {#if card.note && !card.isArchived}
            <div>
              <p>{card.note}</p>
            </div>
          {:else if card.content && card.content.title}
            <p>{card.content.title}</p>
          {/if}
          <div>
            <button on:click="{handleCardMutations(card, "editCard", {"note": "Get this from user."})}">Edit Note</button>
            <button on:click="{handleCardMutations(card, "editCard", {"switchArchive": true})}">Switch Archive</button>
            <button on:click="{handleCardMutations(card, "deleteCard")}">Delete Card</button>
            <button on:click="{handleCardMutations(card, "convertCardToIssue", {"title": "Converted from VSCode", "body": "This issue was converted from a Project card from VSCode"})}">Convert to Issue</button>
          </div>
          {/each}
      </div>
    {/each}
  </div>
{/if}
