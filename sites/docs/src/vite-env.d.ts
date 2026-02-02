// Type declarations for imports with ?withSource

interface SourceParam {
    hideScript?: boolean;
    hideStyle?: boolean;
    hideComments?: boolean;
}
type SourceParamKey = 'hideScript' | 'hideStyle' | 'hideComments';

interface SourceConfig {
    raw: string;
    filtered: string;
    highlighted: string;
    config: string;
}

declare module '*.svelte?withSource' {
    const component: import('svelte').Component;
    export default component;
    export const source: SourceConfig;
}
declare module '*&hideScript' {
    const component: import('svelte').Component;
    export default component as import('svelte').Component;
    export const source: SourceConfig;
}
declare module '*&hideStyle' {
    const component: import('svelte').Component;
    export default component;
    export const source: SourceConfig;
}
declare module '*&hideComments' {
    const component: import('svelte').Component;
    export default component;
    export const source: SourceConfig;
}
