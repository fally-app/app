import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function get(): Promise<EndpointOutput> {
	const data = [{ name: 'Makuza', houses: 12, age: 15 }];
	return { body: data };
}

export async function post(request: ServerRequest): Promise<EndpointOutput> {
	console.log({ request });
	return { body: '' };
}
