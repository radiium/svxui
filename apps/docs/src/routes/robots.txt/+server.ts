import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
    const body = `User-agent: *\nDisallow:\nSitemap: ${url.origin}/sitemap.xml`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain' }
    });
};
