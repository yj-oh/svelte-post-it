import { writable } from 'svelte/store';

function persist(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function writableStorage(key, initValue) {
	const storageValue = JSON.parse(localStorage.getItem(key));
	if (!storageValue) {
		persist(key, initValue);
	}

	const store = writable(storageValue || initValue);
	store.subscribe((value) => persist(key, value));

	return store;
}
