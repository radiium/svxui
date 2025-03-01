import { Type } from 'ts-morph';

export type ComponentTypeArguments = {
    propsType: Type | undefined;
    exportsType: Type | undefined;
    bindingsNames: string[];
    jsDoc?: any;
};

export interface SharedTypeMetadata {
    name: string;
    text: string;
    kind?: string;
}

export interface ExtendedMetadata {
    type: string;
    isSvelteElement?: boolean;
}

export interface JsDocMetadata {
    text: string;
    commentText: string;
    tags: { name: string; text?: string; comment?: string }[];
}

export interface PropMetadata {
    name: string;
    isOptional: boolean;
    isBindable: boolean;
    isSnippet: boolean;
    type: string;
    aliasType?: string;
    values?: string[];
    defaultValue?: any;
    jsDoc?: JsDocMetadata[];
}

export interface ComponentMetadata {
    name: string;
    path: string;
    props: PropMetadata[];
    exports: PropMetadata[];
    extendeds: ExtendedMetadata[];
    jsDoc?: JsDocMetadata[];
}

export interface ComponentGroupMetadata {
    name: string;
    components: ComponentMetadata[];
    sharedTypes?: SharedTypeMetadata[];
    sharedTypesText?: string;
}
