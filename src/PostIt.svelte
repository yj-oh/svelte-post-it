<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { times, chevronUp, chevronDown } from 'svelte-awesome/icons';
	import { handleInputBlur } from './utils';

	const dispatch = createEventDispatcher();

	export let id;
	export let boardId;
	export let title;
	export let content;
	export let position;
	export let size;
	export let isOpen;
	export let zIndex;

	export let isEditTitle;
	export let isEditContent;

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
					on:blur={() => dispatch('updateTitle', { id, title })}
					on:keydown={handleInputBlur}
				/>
			{:else}
				<div class='title' on:click={() => dispatch('toggleEditTitle', id)}>
					<span>{title}</span>
				</div>
			{/if}
		</div>
		<div class='icon-area'>
			<span on:click={() => dispatch('toggleOpen', id)}>
				<Icon data={isOpen ? chevronUp : chevronDown} />
			</span>
			<span on:click={() => dispatch('delete', id)}>
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
				>{content}</textarea>
			{:else}
				<div class='content'>
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
