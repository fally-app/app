import { writable } from 'svelte/store';

interface User {
	name: string;
}

const user = writable<User | null>(null);

export default user;
