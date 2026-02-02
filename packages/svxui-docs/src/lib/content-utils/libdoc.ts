import libDocJson from './libdoc.json' with { type: 'json' };
import type { LibraryDocumentation } from './libdoc.types';

export const libDoc = libDocJson as LibraryDocumentation;

export const getComponent = (slug: string) => libDoc.components.find((item) => item.name === slug);
export const getBuilder = (slug: string) => libDoc.builders.find((item) => item.name === slug);
export const getAttachment = (slug: string) => libDoc.attachments.find((item) => item.name === slug);
export const getUtility = (slug: string) => libDoc.utilities.find((item) => item.name === slug);
