import { getContext, setContext } from 'svelte';

const contextKeyInputGroup = 'svxui-context-input-group';

export function setInputGroupContext(ctx: boolean): void {
    setContext(contextKeyInputGroup, ctx);
}

export function getInputGroupContext(): boolean {
    return getContext<boolean | undefined>(contextKeyInputGroup) === true;
}
