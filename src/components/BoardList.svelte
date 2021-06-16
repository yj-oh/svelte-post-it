<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { plus } from 'svelte-awesome/icons';
	import { boardList, activeBoard } from '../store/stores';
	import { getInitBoard } from '../utils';

	function addBoard() {
		const initBoard = getInitBoard();

		boardList.set([...$boardList, initBoard]);
		activeBoard.set(initBoard);
	}

	function changeActiveBoard(e) {
		const id = e.target.dataset.id;
		const newActiveBoard = $boardList.find(board => board.id === id);

		activeBoard.set(newActiveBoard);
	}
</script>

<section>
	<h3>📒 Online Post-it</h3>
	<ul class='nav-board'>
		{#each $boardList as board (board.id)}
			<li
				class={board.id === $activeBoard.id ? 'active' : ''}
				data-id={board.id}
				on:click={changeActiveBoard}
			>
				<span>{board.name}</span>
			</li>
		{/each}
		<li class='add-btn' on:click={addBoard}>
			<Icon data={plus} />
		</li>
	</ul>
</section>

<style>
    section {
        width: 200px;
        background-color: rgb(226, 226, 226);
        overflow-y: auto;
    }
    h3 {
        padding: 1rem;
        border-bottom: 1px solid rgb(210, 210, 210);
    }
    li {
        display: flex;
        align-items: center;
        padding: 0.5rem 1.5rem;
	    height: 2.5rem;
        line-height: 1.5rem;
        cursor: pointer;
    }
    li:hover {
        background-color: #c5c5c5;
    }
    li.active {
        background-color: #212121;
        color: #ffffff;
    }
    li.add-btn {
	    justify-content: center;
    }
    li span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    :global(.nav-board svg) {
	    flex-shrink: 0;
    }
</style>
