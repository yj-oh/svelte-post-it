<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { times, chevronUp, chevronDown } from 'svelte-awesome/icons';
	import { selectOnFocus, handleInputBlur } from '../utils';
	import { postItList } from '../store/stores';
	import marked from 'marked';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/base16/material-darker.css';

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

	$: newWidth = size.width;
	$: newHeight = size.height;

	$: style = `--x:${position.x}px; --y:${position.y}px;`
		+ `--width:${size.width}px; --height:${isOpen ? `${size.height}px` : 0};`
		+ `--resize:${isOpen ? 'both' : 'none'};`;

	marked.setOptions({
		highlight: function(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		},
	});

	let resizeObserver = new ResizeObserver(entries => {
		for (let entry of entries) {
			const rect = entry.contentRect;
			newWidth = rect.width;
			newHeight = rect.height;
		}
	});
	function handleObserver(e) {
		resizeObserver.observe(e.currentTarget);
	}

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

	function updateSize(e) {
		if(!isOpen || (size.width === newWidth && size.height === newHeight)) {
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
		resizeObserver.unobserve(e.currentTarget);
	}

	function onMousedown(e) {
		const target = e.currentTarget.parentNode;

		const boardListWidth = document.querySelector('#board').getBoundingClientRect().left;
		const shiftX = e.clientX - target.getBoundingClientRect().left + boardListWidth;
		const shiftY = e.clientY - target.getBoundingClientRect().top;

		let x;
		let y;

		document.onmousemove = function(e) {
			x = e.pageX - shiftX;
			y = e.pageY - shiftY;

			if(x < 0) x = 0;
			if(y < 0) y = 0;

			target.style.left = x + 'px';
			target.style.top = y + 'px';
		}

		document.onmouseup = function() {
			document.onmouseup = null;
			document.onmousemove = null;

			updatePosition(x, y);
		};
	}

	function updatePosition(x, y) {
		if(x === undefined || y === undefined) return;

		postItList.update(list => {
			list.map(postIt => {
				if (postIt.id === id) {
					postIt.position = { x, y };
				}
			});
			return list;
		});
	}

	function onDelete() {
		if(content && !window.confirm('정말 삭제하시겠습니까?')) {
			return;
		}
		postItList.update(list => {
			return list.filter(postIt => postIt.id !== id);
		});
	}

	function convertMarkdownToHtml(markdown) {
		const html = marked(markdown);
		return html.replaceAll(/(?<!\<(.*)\>)\n/gm, '<br/>');
	}
</script>

<article
	style={style}
	on:mousedown={handleObserver}
	on:mouseup={updateSize}
	class={isOpen ? 'shadow' : ''}
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
					use:selectOnFocus
				/>
			{:else}
				<div class='title pre' on:click={toggleEditTitle}>
					<span>{title}</span>
				</div>
			{/if}
		</div>
		<div class='icon-area'>
			<span on:click={updateIsOpen}>
				<Icon data={isOpen ? chevronUp : chevronDown} />
			</span>
			<span on:click={onDelete}>
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
				>{content}</textarea>
			{:else}
				<div class='content' on:click={toggleEditContent}>
					<div>{@html convertMarkdownToHtml(content)}</div>
				</div>
			{/if}
		</div>
	{/if}
</article>

<style lang='scss'>
	@import 'public/common';

	$headerHeight: 2rem;

    article {
	    position: absolute;
	    left: var(--x);
	    top: var(--y);
        width: var(--width);
        height: var(--height);
		min-width: 130px;
		min-height: $headerHeight;
        resize: var(--resize);
        overflow: auto;
	    color: #3e3a00;

        &.shadow {
            box-shadow: 1px 1px 1px 0 rgba(115, 99, 0, 0.2);
            -webkit-box-shadow: 1px 1px 1px 0 rgba(115, 99, 0, 0.2);
        }
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        height: $headerHeight;
        background-color: #e2c000;
    }
	header .title-area {
        width: 80%;

		input {
			padding: 1px 2px;
		}
		span {
			@include ellipsis;
			display: block;
		}
    }
	header .icon-area {
        display: flex;
        justify-content: space-between;
        width: 2.5rem;
        color: #736203;
    }
	.content-area {
		width: 100%;
		height: calc(100% - #{$headerHeight});
		background-color: #f8d300;
		overflow: auto;

		.content {
			padding: 5px 10px;
		}
		textarea.content {
			font-size: 14px;
			line-height: 1.5rem;
			resize: none;
		}
	}

    .title, 
    .content {
	    width: 100%;
	    height: 100%;
        background-color: inherit;
        border: none;
    }
    div.title,
    div.content,
    .icon-area {
        cursor: pointer;
    }
</style>
