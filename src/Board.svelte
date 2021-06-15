<script>
	import { boardList, activeBoard } from './store/stores';

	let isEdit = false;

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
</script>

<section>
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
</section>

<style>
	section {
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
