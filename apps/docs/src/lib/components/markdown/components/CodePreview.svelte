<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Flex, Panel, Separator, Switch, Text, useTheme, type Color } from 'svxui';
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

    let codeContainerEl: HTMLDivElement | undefined = $state();
    let id = $props.id();

    $effect(() => {
        if (codeContainerEl) {
            const preElement = codeContainerEl.querySelector('pre');
            if (preElement) {
                preElement.tabIndex = -1;
            }
        }
    });

    const theme = useTheme();
</script>

<Flex justify="start" direction="column" gap="3" class="wrapper w-full {enableOpenCode ? '' : 'mt-6'}">
    {#if enableOpenCode}
        <Flex justify="end" gap="3" class="w-full">
            <Text as="label" size="2">
                <Flex justify="start" gap="2" align="center">
                    Show code
                    <Switch name="toggle-code-{id}" bind:checked={codeOpened} color={theme.color as Color} />
                </Flex>
            </Text>
        </Flex>
    {/if}

    <Panel p="0" variant="soft" color="neutral" outline fullWidth>
        <Flex justify="start" direction="column">
            {#if meta?.title}
                <div class="title">
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
                    <div class="code" bind:this={codeContainerEl}>
                        <div class="code-content" use:setCodeString>
                            {@render code?.()}
                        </div>

                        <div class="code-actions">
                            <CopyCodeButton {codeString} />
                        </div>
                    </div>
                {/if}
            {/if}
        </Flex>
    </Panel>
</Flex>

<style>
    .title {
        overflow: hidden;
        background-color: var(--accent-5);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        display: flex;
        align-items: center;
        width: 100%;
        padding: var(--space-2) var(--space-3);
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
