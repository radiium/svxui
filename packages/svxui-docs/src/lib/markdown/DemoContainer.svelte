<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Flexbox, Panel, Separator, Switch, Text, useThemeRootContext, type Color } from 'svxui';
    import BackgroundDots from '../layout/components/BackgroundDots.svelte';
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

    let enableOpenCode = $derived(meta?.enableOpenCode === true);
    let codeOpened = $state(meta?.enableOpenCode === true ? false : true);

    let element: HTMLDivElement | undefined = $state();

    $effect(() => {
        if (element) {
            const preElement = element.querySelector('pre');
            if (preElement) {
                preElement.tabIndex = -1;
            }
        }
    });

    const themeRoot = useThemeRootContext();
</script>

<Flexbox direction="column" gap="3" class="{enableOpenCode ? '' : 'mt-6'} w-100">
    {#if enableOpenCode}
        <Flexbox justify="end" gap="3" class="w-100">
            <Text as="label" size="2">
                <Flexbox gap="2" align="center">
                    Show code
                    <Switch bind:checked={codeOpened} color={themeRoot.color as Color}></Switch>
                </Flexbox>
            </Text>
        </Flexbox>
    {/if}

    <Panel size="0" variant="outline" class=" w-100">
        {#if meta?.title}
            <div class="title w-100 py-2 px-3">
                <Text weight="medium">{meta.title}</Text>
            </div>
            <Separator size="4" />
        {/if}

        {#if example}
            <div class="example" class:column={meta?.column}>
                <div class="exemple-background">
                    <BackgroundDots />
                </div>
                <div class="exemple-content">
                    {@render example?.()}
                </div>
            </div>
        {/if}

        {#if codeOpened}
            {#if example && code}
                <Separator size="4" />
            {/if}

            {#if code}
                <div class="code" bind:this={element}>
                    <div class="code-content" use:setCodeString>
                        {@render code?.()}
                    </div>

                    <div class="code-actions">
                        <CopyCodeButton {codeString} />
                    </div>
                </div>
            {/if}
        {/if}
    </Panel>
</Flexbox>

<style>
    .title {
        overflow: hidden;
        background-color: var(--accent-7);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }
    .example {
        position: relative;

        .exemple-background {
            position: absolute;
            z-index: 0;
            inset: 0;
            width: 100%;
            height: 100%;
        }

        .exemple-content {
            position: relative;
            width: 100%;
            height: 100%;
            padding: var(--space-8) var(--space-3);
            gap: var(--space-3);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            position: relative;
        }
    }

    .code {
        background-color: var(--color-background-0);
        display: flex;
        position: relative;

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
