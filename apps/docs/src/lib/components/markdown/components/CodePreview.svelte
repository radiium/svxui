<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Flexbox, Panel, Separator, Switch, Text, useTheme, type Color } from 'svxui';
    import CopyCodeButton from './CopyCodeButton.svelte';

    type Props = {
        meta?: Record<string, unknown>;
        preview?: Snippet<[void]>;
        code?: Snippet<[void]>;
    };
    let { meta, preview, code }: Props = $props();

    let codeString = $state('');
    function setCodeString(node: HTMLElement): void {
        codeString = node.innerText.trim() ?? '';
    }

    let enableOpenCode = $derived(meta?.enableOpenCode === true);
    let codeOpened = $derived(meta?.enableOpenCode === true ? false : true);

    let element: HTMLDivElement | undefined = $state();
    let id = $props.id();

    $effect(() => {
        if (element) {
            const preElement = element.querySelector('pre');
            if (preElement) {
                preElement.tabIndex = -1;
            }
        }
    });

    const theme = useTheme();
</script>

<Flexbox direction="column" gap="3" class="{enableOpenCode ? '' : 'mt-6'} w-100 wrapper">
    {#if enableOpenCode}
        <Flexbox justify="end" gap="3" class="w-100">
            <Text as="label" size="2">
                <Flexbox gap="2" align="center">
                    Show code
                    <Switch name="toggle-code-{id}" bind:checked={codeOpened} color={theme.color as Color} />
                </Flexbox>
            </Text>
        </Flexbox>
    {/if}

    <Panel size="0" variant="soft" color="neutral" outline class="w-100">
        <Flexbox direction="column">
            {#if meta?.title}
                <div class="title w-100 py-2 px-3">
                    <Text size="2">{meta.title}</Text>
                </div>
            {/if}

            {#if preview}
                <div class="example" class:column={meta?.column}>
                    <div class="exemple-content">
                        {@render preview?.()}
                    </div>
                </div>
            {/if}

            {#if codeOpened}
                {#if preview && code}
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
        </Flexbox>
    </Panel>
</Flexbox>

<style>
    .title {
        overflow: hidden;
        background-color: var(--accent-5);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        display: flex;
        align-items: center;
    }

    .example {
        position: relative;

        &.column {
            .exemple-content {
                flex-direction: column;
            }
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
            user-select: none;
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
            top: 8px;
            right: 8px;
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }
    }
</style>
