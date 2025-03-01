import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    console.log('hook.server handle');
    return await resolve(event, {
        preload: (input) => {
            console.log('resolve preload', input);
            return true;
        }
    });
};
