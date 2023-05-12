import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const username = writable('');
export const profilePicture = writable('');