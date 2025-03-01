<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Button, Flexbox, Panel, Switch, Text, useThemeRootContext, type Color } from 'svxui';
    import CopyCodeButton from './components/CopyCodeButton.svelte';

    type Props = {
        meta?: Record<string, unknown>;
        example?: Snippet<[void]>;
        code?: Snippet<[void]>;
    };
    let { meta, example, code }: Props = $props();

    let codeString = $state('');
    function setCodeString(node: HTMLElement): void {
        codeString = node.innerText.trim() ?? '';
    }

    let showCode = $state(meta?.toggleableCode === true ? false : true);

    let expandable = $state(false);
    let expanded = $state(false);
    let element: HTMLDivElement | undefined = $state();

    $effect(() => {
        if (element) {
            const preElement = element.querySelector('pre');
            if (preElement) {
                expandable = element.scrollHeight < preElement.scrollHeight;
            }
        }
    });

    const themeRoot = useThemeRootContext();
</script>

<Panel size="0" variant="outline" class="mt-4 w-100 overflow-auto">
    {#if meta?.title}
        <div class="title w-100 py-2 px-3">
            <Text weight="medium">{meta.title}</Text>
        </div>
        <div class="separator"></div>
    {/if}

    {#if example}
        <div class="example" class:column={meta?.column}>
            {@render example?.()}

            {#if meta?.toggleableCode}
                <div class="example-actions">
                    <Text as="label" size="2">
                        <Flexbox gap="2" align="center">
                            Show code
                            <Switch bind:checked={showCode} color={themeRoot.color as Color}></Switch>
                        </Flexbox>
                    </Text>
                </div>
            {/if}
        </div>
    {/if}

    {#if showCode}
        {#if example && code}
            <div class="separator"></div>
        {/if}

        {#if code}
            <div class="code" bind:this={element} class:expanded>
                <div class="code-content" use:setCodeString>
                    {@render code?.()}
                </div>

                <div class="code-actions">
                    {#if expandable}
                        <Button variant="soft" onclick={() => (expanded = !expanded)}>
                            {#if expanded}
                                collapse
                            {:else}
                                expand
                            {/if}
                        </Button>
                    {/if}
                    <CopyCodeButton {codeString} />
                </div>
            </div>
        {/if}
    {/if}
</Panel>

<style>
    .title {
        background-color: var(--accent-7);
        overflow: hidden;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }
    .example {
        background-color: var(--color-background-1);
        padding: var(--space-8) var(--space-3);
        gap: var(--space-3);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;

        .example-actions {
            position: absolute;
            top: calc((var(--space-6) + var(--space-1)) * -1);
            right: 0;
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }
    }

    .separator {
        border-top: 1px solid var(--accent-7);
    }

    .code {
        background-color: var(--color-background-0);
        display: flex;
        position: relative;

        max-height: 300px;
        &.expanded {
            max-height: unset;
        }

        .code-content {
            display: contents;
        }

        .code-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }
    }
</style>
