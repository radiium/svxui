import path from 'node:path';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/')
    },
    slugFull: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`
    },
    fileName: {
        type: 'string',
        resolve: (doc) => path.parse(doc._raw.sourceFilePath.split('/').slice(-1).join('/')).name
    },
    suffix: {
        type: 'string',
        resolve: (doc) => path.parse(doc._raw.sourceFilePath.split('/').slice(-1).join('/')).ext
    }
};

/** @type {import('contentlayer/source-files').FieldDefs} */
const fields = {
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: false
    },
    category: {
        type: 'string',
        required: false
    }
};

export const Start = defineDocumentType(() => ({
    name: 'Start',
    filePathPattern: `*.md`,
    fields,
    computedFields
}));

export const Theme = defineDocumentType(() => ({
    name: 'Theme',
    filePathPattern: `theme/**/*.md`,
    fields,
    computedFields
}));

export const Component = defineDocumentType(() => ({
    name: 'Component',
    filePathPattern: `components/**/*.md`,
    fields,
    computedFields
}));

export const Action = defineDocumentType(() => ({
    name: 'Action',
    filePathPattern: `actions/**/*.md`,
    fields,
    computedFields
}));

export const Example = defineDocumentType(() => ({
    name: 'Example',
    filePathPattern: `examples/**/*.md`,
    fields,
    computedFields
}));

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Start, Theme, Component, Action, Example],
    disableImportAliasWarning: true
});
