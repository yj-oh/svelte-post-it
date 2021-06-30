<script>
	import { onMount } from 'svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { plus, trash } from 'svelte-awesome/icons';
	import { postItList } from '../store/stores';
	import firebase from 'firebase/app';
	import { getBoardList, addBoard } from '../firestore.js';

	const user = firebase.auth().currentUser;

	let boardList = [];

	$: console.log(boardList)

	onMount(() => {
		getBoardList(user.uid).then((data) => {
			boardList = data;
		});
	});

	function add() {
		// const initBoard = getInitBoard();
		//
		// boardList.set([...boardList, initBoard]);
		// activeBoard.set(initBoard);
		addBoard(user.uid);
	}

	function changeActiveBoard(e) {
		const id = e.currentTarget.dataset.id;
		const newActiveBoard = boardList.find(board => board.id === id);

		//activeBoard.set(newActiveBoard);
	}

	function deleteBoard(e) {
		e.stopPropagation();

		if(!window.confirm('정말 삭제하시겠습니까?')) {
			return;
		}

		const id = e.currentTarget.parentNode.dataset.id;

		boardList.update(list => {
			return list.filter(board => board.id !== id);
		});
		postItList.update(list => {
			return list.filter(postIt => postIt.boardId !== id);
		});

		// if($activeBoard.id === id) {
		// 	if(boardList[0]) {
		// 		activeBoard.set(boardList[0]);
		// 	} else {
		// 		addBoard();
		// 	}
		// }
	}

	function logout() {
		// TODO alert 사용하지 않음
		firebase.auth().signOut().then(function() {
			alert('로그아웃 되었습니다.');
		}, function(error) {
			alert('오류가 발생했습니다.');
		});
	}
</script>

<section>
	<header>
		<img src='./logo.png' alt='logo'/>
		<h3>Online Post-it</h3>
	</header>
	<ul>
		{#each boardList as board (board.id)}
			<li
				class={board.activation ? 'active' : ''}
				data-id={board.id}
				on:click={changeActiveBoard}
			>
				<span class='board-name pre'>{board.name}</span>
				<span
					class='delete-btn'
					on:click={deleteBoard}
				>
					<Icon data={trash} />
				</span>
			</li>
		{/each}
		<li class='add-btn' on:click={add}>
			<Icon data={plus} />
		</li>
	</ul>
	<footer>
		<button on:click={logout}>Logout</button>
	</footer>
</section>

<style>
    section {
        width: 200px;
        background-color:#e2e2e2;
        overflow-y: auto;
    }
    header {
	    display: flex;
	    align-items: center;
	    padding: 0.5rem;
        border-bottom: 1px solid rgb(210, 210, 210);
    }
    header img {
	    width: 32px;
    }
    header h3 {
	    padding: 0 0.5rem;
    }
    li {
	    position: relative;
        padding: 0.5rem 1rem 0.5rem 1.2rem;
	    height: 2.5rem;
        line-height: 1.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
	    list-style: none;
    }
    li:hover {
        background-color: #d0d0d0;
    }
    li.active {
	    color: #e2e2e2ff;
	    background-color: #212121;
    }
    .board-name {
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
