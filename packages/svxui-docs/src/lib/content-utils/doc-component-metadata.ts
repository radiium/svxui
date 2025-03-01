import type { ComponentGroupMetadata } from '$lib/types';
import componentMetadataJson from './component-metadata.json' with { type: 'json' };

export const docComponentMetadataList = componentMetadataJson as ComponentGroupMetadata[];

export const getDocComponentMetadata = (slug: string) =>
    docComponentMetadataList.find((item) => item.name === slug);
