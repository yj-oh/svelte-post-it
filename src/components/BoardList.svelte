<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { plus, trash } from 'svelte-awesome/icons';
	import { boardList, activeBoard } from '../store/stores';
	import { getInitBoard } from '../utils';

	function addBoard() {
		const initBoard = getInitBoard();

		boardList.set([...$boardList, initBoard]);
		activeBoard.set(initBoard);
	}

	function changeActiveBoard(e) {
		const id = e.currentTarget.dataset.id;
		const newActiveBoard = $boardList.find(board => board.id === id);

		activeBoard.set(newActiveBoard);
	}
</script>

<section>
	<h3>📒 Online Post-it</h3>
	<ul>
		{#each $boardList as board (board.id)}
			<li
				class={board.id === $activeBoard.id ? 'active' : ''}
				data-id={board.id}
				on:click={changeActiveBoard}
			>
				<span class='board-name'>{board.name}</span>
				<span class='delete-btn'><Icon data={trash} /></span>
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
        background-color:#e2e2e2;
        overflow-y: auto;
    }
    h3 {
        padding: 1rem;
        border-bottom: 1px solid rgb(210, 210, 210);
    }
    li {
	    position: relative;
        padding: 0.5rem 1rem 0.5rem 1.2rem;
	    height: 2.5rem;
        line-height: 1.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
    }
    li:hover {
        background-color: #d0d0d0;
    }
    li.active {
	    color: #e2e2e2ff;
	    background-color: #212121;
    }
    .board-name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .delete-btn, .add-btn {
	    color: #676767;
    }
    .delete-btn {
        display: flex;
        align-items: center;
        position: absolute;
        top: 10%;
        right: 0.5rem;
        padding: 3px 8px;
        height: 80%;
        border-radius: 3px;
        opacity: 0;
    }
    li:hover .delete-btn {
        opacity: 1;
    }
    li.active .delete-btn {
	    background-color: #212121;
    }
    li.active .delete-btn:hover {
        color: #c5c5c5;
    }
    .add-btn {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .delete-btn:hover,
    .add-btn:hover {
        color: #212121;
    }
</style>
