<script>
	import { boardList, activeBoard, postItList } from '../store/stores';
	import PostIt from './PostIt.svelte';
	import { getInitPostIt, handleInputBlur } from '../utils';

	$: filteredPostItList = $postItList
		.filter(postIt => postIt.boardId === $activeBoard.id);

	let isEdit = false;

	function toggleEdit() {
		isEdit = !isEdit;
	}

	function updateBoardName() {
		boardList.update(list => {
			list.map(board => {
				if (board.id === $activeBoard.id) {
					board.name = $activeBoard.name;
				}
			});
			return list;
		});
		toggleEdit();
	}

	function addPostIt(e) {
		const { pageX: x, pageY: y } = e;
		const clientRect = e.target.getBoundingClientRect();
		const initPostIt = getInitPostIt($activeBoard.id, x - clientRect.left, y);

		postItList.set([...$postItList, initPostIt]);
	}
</script>

<section id='board' on:dblclick={addPostIt}>
	<header>
		{#if isEdit}
			<input
				class='board-name'
				required
				autofocus
				maxlength='50'
				bind:value={$activeBoard.name}
				on:blur={updateBoardName}
				on:keydown={handleInputBlur}
			/>
		{:else}
			<div class='board-name' on:click={toggleEdit}>
				<span>{$activeBoard.name}</span>
			</div>
		{/if}
	</header>
	<div class='post-it-area'>
		{#each filteredPostItList as postIt (postIt.id)}
			<PostIt
				{...postIt}
			/>
		{/each}
	</div>
</section>

<style>
	section {
		position: relative;
		width: calc(100% - 200px);
        background-image: linear-gradient(
                rgba(210, 210, 210, 0.5) 0.7px,
                transparent 0.5px
        ),
        linear-gradient(to right, rgba(210, 210, 210, 0.5) 0.7px, #ffffff 0.5px);
        background-size: 10px 10px;
		overflow: auto;
	}
	.board-name {
		padding: 2rem 0 1.5rem 1.5rem;
		width: 100%;
		height: 2rem;
		font-size: 1.5rem;
		font-weight: bold;
	}
    input.board-name {
        border: none;
    }
	div.board-name {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}
    div.board-name span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
