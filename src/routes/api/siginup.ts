import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function post(request: ServerRequest): Promise<EndpointOutput> {
	console.log({ request });
	return { body: '' };
}
