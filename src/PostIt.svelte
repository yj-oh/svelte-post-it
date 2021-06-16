<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { times, chevronUp, chevronDown } from 'svelte-awesome/icons';

	export let postIt;
	export let isEditTitle;
	export let isEditContent;

	let {
		id,
		boardId,
		title,
		content,
		position,
		size,
		isOpen,
		zIndex,
	} = postIt;

	let width = `${size.width}px`;
	let height = `${size.height}px`;
	let x = `${position.x}px`;
	let y = `${position.y}px`;
</script>

<article style='--x:{x}; --y:{y}; --width:{width}; --height:{height};'>
	<header>
		<div class='title-area'>
			{#if isEditTitle}
				<input
					class='title'
					required
					autofocus
					maxlength='50'
					bind:value={title}
				/>
			{:else}
				<div class='title'>
					<span>{title}</span>
				</div>
			{/if}
		</div>
		<div class='icon-area'>
			<span>
				<Icon data={isOpen ? chevronUp : chevronDown} />
			</span>
			<span>
				<Icon data={times} />
			</span>
		</div>
	</header>
	<div class='content-area'>
		{#if isEditContent}
			<input
				class='content'
				required
				autofocus
				maxlength='50'
				bind:value={content}
			/>
		{:else}
			<div class='content'>
				<span>{content}</span>
			</div>
		{/if}
	</div>
</article>

<style>
    article {
	    position: absolute;
	    left: var(--x);
	    top: var(--y);
        width: var(--width);
        height: var(--height);
        background-color: #f8d300;
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
    .title {
	    width: 100%;
    }
    div.title, div.content {
        cursor: pointer;
    }
    div.title > span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
