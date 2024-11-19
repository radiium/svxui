/**
 *
 * Schema Component
 *
 */

import type { Component } from 'svelte';
import type { SelectOption } from 'svxui';

/**
 * Props
 */

export enum SchemaPropType {
    string = 'string',
    number = 'number',
    stringOrNumber = 'string | number',
    boolean = 'boolean',
    enum = 'enum',
    htmlElement = 'htmlElement',
    asElement = 'asElement',
    custom = 'custom'
}

export type SchemaProp = {
    name: string;
    type: SchemaPropType | string;
    description?: string;
    bindable?: boolean;
    //
    typeHtmlElement?: string;
    typeAsElement?: string;
    typeCustom?: string;
    values?: ReadonlyArray<string | boolean | number>;
    default?:
        | string
        | number
        | boolean
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        | Function
        | Array<SelectOption | string | number | boolean>
        | HTMLElement
        | undefined
        | null;
};

export type SchemaPropHtmlElement = {
    name: string;
    description?: string;
    type: SchemaPropType.htmlElement;
    typeHtmlElement: string;
    default: string | undefined;
};
export type SchemaPropAsElement = {
    name: string;
    description?: string;
    type: SchemaPropType.asElement;
    typeAsElement: string;
    default: string | undefined;
};
export type SchemaPropCustom = {
    name: string;
    description?: string;
    type: SchemaPropType.custom;
    typeCustom: string;
    default: unknown;
};
export type SchemaPropEnum = {
    name: string;
    description?: string;
    type: SchemaPropType.enum;
    values?: ReadonlyArray<string | number | boolean>;
    default: string | number | boolean | undefined;
};

/**
 * Snippet
 */

export type SchemaSnippet = {
    name?: string;
    description?: string;
    props?: SchemaProp[];
};

/**
 * Events
 */

export type SchemaEvent = {
    name: string;
    type?: string;
};

/**
 * Components
 */

export type SchemaComponent = {
    name?: string;
    extend?: string;
    props: SchemaProp[];
    snippets: SchemaSnippet[];
    events: SchemaEvent[];
};

/**
 *
 * Schema Actions
 *
 */

export type SchemaParam = {
    name: string;
    description?: '';
    type: SchemaPropType;
    typeCustom?: string;
};
export type SchemaAttributes = {
    name: string;
    type?: string;
};

export type SchemaAction = {
    name?: string;
    description?: string;
    params: SchemaParam[];
    attributes: SchemaAttributes[];
};

/**
 *
 * Pages
 *
 */

export type Sample = {
    title?: string;
    component?: Component;
    componentCode?: string;
};

export type DocPageProps = {
    title: string;
    description?: string;
    playground?: Component;
    schemas?: SchemaComponent[] | SchemaAction[];
    samples?: Sample[];
};
