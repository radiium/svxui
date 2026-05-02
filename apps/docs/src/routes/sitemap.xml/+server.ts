import { loadEntries } from '$lib/content-utils/load-entries.js';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
    const origin = url.origin;
    const entries = loadEntries();

    const paths = [
        '/',
        ...entries.base.map(({ slug }) => `/docs/${slug}`),
        ...entries.layouts.map(({ slug }) => `/docs/layouts/${slug}`),
        ...entries.components.map(({ slug }) => `/docs/components/${slug}`),
        ...entries.builders.map(({ slug }) => `/docs/builders/${slug}`),
        ...entries.attachments.map(({ slug }) => `/docs/attachments/${slug}`),
        ...entries.utilities.map(({ slug }) => `/docs/utilities/${slug}`)
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `\t<url>\n\t\t<loc>${origin}${path}</loc>\n\t</url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
