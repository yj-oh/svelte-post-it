<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { plus } from 'svelte-awesome/icons';
	import { getUuid } from './utils';

	const LIST_ITEM_NAME = 'boardList';
	const ACTIVE_BOARD_ITEM_NAME = 'activeBoard';

	let activeBoard = restoreActiveBoard();

	$: list = restoreList();
	$: if(activeBoard) persistActiveBoard();

	function persistList() {
		localStorage.setItem(LIST_ITEM_NAME, JSON.stringify(list));
	}

	function persistActiveBoard() {
		localStorage.setItem(ACTIVE_BOARD_ITEM_NAME, JSON.stringify(activeBoard));
	}

	function restoreList() {
		const storageList = localStorage.getItem(LIST_ITEM_NAME);
		return storageList && storageList.length > 0 ? JSON.parse(storageList) : [];
	}

	function restoreActiveBoard() {
		const storageActiveBoard = localStorage.getItem(ACTIVE_BOARD_ITEM_NAME);
		return storageActiveBoard ? JSON.parse(storageActiveBoard) : null;
	}

	function addBoard() {
		activeBoard = { id: getUuid(), name: '새 보드' };
		list.push(activeBoard);
		persistList();
	}

	function changeActiveBoard(e) {
		const id = e.target.dataset.id;
		activeBoard = list.find(board => board.id === id);
	}
</script>

<section>
	<h3>📒 Online Post-it</h3>
	<ul class='nav-board'>
		{#each list as board (board.id)}
			<li
				class={board.id === activeBoard?.id ? 'active' : ''}
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
    li:hover, li.active {
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
