<script>
	import { onMount } from 'svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { times, chevronUp, chevronDown } from 'svelte-awesome/icons';
	import { handleInputBlur } from '../utils';
	import { postItList } from '../store/stores';

	export let id;
	export let boardId;
	export let title;
	export let content;
	export let position;
	export let size;
	export let isOpen;
	export let zIndex;

	let isEditTitle = false;
	let isEditContent = false;

	let { width, height } = size;
	let { x, y } = position;

	let newWidth = width;
	let newHeight = height;
	let resizeObserver = new ResizeObserver(entries => {
		for (let entry of entries) {
			const rect = entry.contentRect;
			newWidth = rect.width;
			newHeight = rect.height;
		}
	});
	onMount(() => {
		document.querySelectorAll('article').forEach(article => {
			resizeObserver.observe(article);
		});
	});

	function toggleEditTitle() {
		isEditTitle = !isEditTitle;
	}
	function toggleEditContent() {
		isEditContent = !isEditContent;
	}

	function updateIsOpen() {
		postItList.update(list => {
			list.map(postIt => {
				if (postIt.id === id) {
					postIt.isOpen = !postIt.isOpen;
				}
			});
			return list;
		});
	}

	function updateTitle() {
		postItList.update(list => {
			list.map(postIt => {
				if (postIt.id === id) {
					postIt.title = title;
				}
			});
			return list;
		});
		toggleEditTitle();
	}

	function updateContent(e) {
		postItList.update(list => {
			list.map(postIt => {
				if (postIt.id === id) {
					postIt.content = e.target.value;
				}
			});
			return list;
		});
		toggleEditContent();
	}

	function deletePostIt() {
		if(content && !window.confirm('정말 삭제하시겠습니까?')) {
			return;
		}
		postItList.update(list => {
			return list.filter(postIt => postIt.id !== id);
		});
	}

	function updateSize() {
		if(width === newWidth && height === newHeight) {
			return;
		}
		postItList.update(list => {
			list.map(postIt => {
				if (postIt.id === id) {
					postIt.size = { width: newWidth, height: newHeight };
				}
			});
			return list;
		});
	}

	function onMousedown(e) {
		const target = e.currentTarget.parentNode;
		const boardListWidth = document.querySelector('section#board').getBoundingClientRect().left;

		let x;
		let y;
		let shiftX = e.clientX - target.getBoundingClientRect().left + boardListWidth;
		let shiftY = e.clientY - target.getBoundingClientRect().top;

		function moveAt(pageX, pageY) {
			x = pageX - shiftX;
			y = pageY - shiftY;
			target.style.left = x + 'px';
			target.style.top = y + 'px';
		}

		moveAt(e.pageX, e.pageY);

		function onMouseMove(e) {
			moveAt(e.pageX, e.pageY);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseleave', function() {
			document.removeEventListener('mousemove', onMouseMove);
			target.style.left = position.x + 'px';
			target.style.top = position.y + 'px';
		});

		target.onmouseup = function() {
			document.removeEventListener('mousemove', onMouseMove);
			target.onmouseup = null;

			updatePosition(x, y);
		};
	}

	function updatePosition(x, y) {
		postItList.update(list => {
			list.map(postIt => {
				if (postIt.id === id) {
					postIt.position = { x, y };
				}
			});
			return list;
		});
	}
</script>

<article
	style='--x:{`${x}px`}; --y:{`${y}px`}; --width:{`${width}px`}; --height:{`${height}px`}; --resize:{isOpen ? "both" : "none"};'
	on:mouseup={updateSize}
>
	<header
		on:mousedown={onMousedown}
		on:dragstart={() => { return false; }}
	>
		<div class='title-area'>
			{#if isEditTitle}
				<input
					class='title'
					required
					autofocus
					maxlength='50'
					bind:value={title}
					on:blur={updateTitle}
					on:keydown={handleInputBlur}
				/>
			{:else}
				<div class='title' on:click={toggleEditTitle}>
					<span>{title}</span>
				</div>
			{/if}
		</div>
		<div class='icon-area'>
			<span on:click={updateIsOpen}>
				<Icon data={isOpen ? chevronUp : chevronDown} />
			</span>
			<span on:click={deletePostIt}>
				<Icon data={times} />
			</span>
		</div>
	</header>
	{#if isOpen}
		<div class='content-area'>
			{#if isEditContent}
				<textarea
					class='content'
					required
					autofocus
					on:blur={updateContent}
					on:keydown={handleInputBlur}
				>{content}</textarea>
			{:else}
				<div class='content' on:click={toggleEditContent}>
					<span>{content}</span>
				</div>
			{/if}
		</div>
	{/if}
</article>

<style>
    article {
	    position: absolute;
	    left: var(--x);
	    top: var(--y);
        width: var(--width);
        height: var(--height);
        min-width: 130px;
        min-height: 100px;
        resize: var(--resize);
        overflow: auto;
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        height: 2rem;
        background-color: #e2c000;
    }
    .title-area {
        width: 80%;
    }
    .icon-area {
        display: flex;
        justify-content: space-between;
        width: 2.5rem;
        cursor: pointer;
    }
    .title, .content {
	    width: 100%;
	    height: 100%;
    }
    div.title, div.content {
        cursor: pointer;
    }
    div.title > span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    input.title {
	    padding: 1px 2px;
	    border: none;
    }
    .content-area {
	    width: 100%;
	    height: calc(100% - 2rem);
        background-color: #f8d300;
    }
    .content {
        padding: 5px 10px;
    }
    textarea.content {
        resize: none;
    }
</style>
