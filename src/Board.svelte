<script>
	import { boardList, activeBoard, postItList } from './store/stores';
	import PostIt from './PostIt.svelte';
	import { getInitPostIt } from './utils';

	let isEdit = false;
	let editTitlePostItId = null;
	let editContentPostItId = null;

	function toggleEdit() {
		isEdit = !isEdit;
	}

	function handleInputBlur(e) {
		if (e.key === 'Enter') {
			e.target.blur();
		}
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

<section on:dblclick={addPostIt}>
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
		{#each $postItList as postIt (postIt.id)}
			<PostIt
				{postIt}
				isEditTitle={postIt.id === editTitlePostItId}
				isEditContent={postIt.id === editContentPostItId}
			/>
		{/each}
	</div>
</section>

<style>
	section {
		position: relative;
		width: calc(100% - 200px);
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
