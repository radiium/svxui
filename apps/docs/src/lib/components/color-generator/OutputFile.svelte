<script lang="ts">
    import CheckAltIcon from '$lib/components/icons/CheckAltIcon.svelte';
    import ClipboardIcon from '$lib/components/icons/ClipboardIcon.svelte';
    import { Button, Clipboard, Dialog, Flexbox, Panel, Text } from 'svxui';
    import EyeIcon from '../icons/EyeIcon.svelte';
    import FileArrowDownIcon from '../icons/FileArrowDownIcon.svelte';
    import XIcon from '../icons/XIcon.svelte';
    import Code from '../markdown/elements/code.svelte';

    type Props = {
        name: string;
        codeHtml?: string; // pre-highlighted HTML (Shiki); plain text is extracted via DOMParser for clipboard/download
    };

    let { name, codeHtml }: Props = $props();

    let isOpen = $state(false);
    let code = $derived.by(() => {
        const doc = new DOMParser().parseFromString(codeHtml ?? '', 'text/html');
        return doc.body.textContent || '';
    });

    function downloadFile() {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const clipboard = new Clipboard();
    function copyToClipboard() {
        clipboard.copy(code);
    }

    let codeContainerEl: HTMLDivElement | undefined = $state();
    $effect(() => {
        if (codeContainerEl) {
            const preElement = codeContainerEl.querySelector('pre');
            if (preElement) {
                preElement.tabIndex = -1;
            }
        }
    });
</script>

<Flexbox align="center" wrap="wrap" gap="3" class="p-4 flex-auto" fullWidth>
    <Text weight="medium">
        <Code>{name}</Code>
    </Text>

    <div class="flex-auto"></div>

    <Flexbox align="end" wrap="wrap" gap="3">
        <!-- Show code -->
        <Button size="2" variant="soft" onclick={() => (isOpen = true)}>
            <EyeIcon />
            Show code
        </Button>
        <Dialog bind:isOpen closeOnBackdropClick closeOnEscape layout="scroll">
            <Panel variant="surface" outline class="relative">
                <Flexbox align="center" justify="between" gap="3">
                    <!-- Copy to clipboard -->
                    <Button
                        size="2"
                        variant="soft"
                        disabled={!clipboard.isAvailable}
                        onclick={copyToClipboard}
                    >
                        {#if clipboard.isCopying}
                            <CheckAltIcon size="20" data-color="green" style="color: var(--accent-9)" />
                        {:else}
                            <ClipboardIcon size="20" />
                        {/if}
                        Copy code to clipboard
                    </Button>

                    <!-- Download file -->
                    <Button size="2" variant="soft" onclick={downloadFile}>
                        <FileArrowDownIcon />
                        Download file
                    </Button>

                    <div class="flex-auto"></div>

                    <Button
                        size="2"
                        variant="soft"
                        title="Close 'Show code' dialog"
                        iconOnly
                        onclick={() => (isOpen = false)}
                    >
                        <XIcon />
                    </Button>
                </Flexbox>
                <div class="code-content" bind:this={codeContainerEl}>
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html codeHtml}
                </div>
            </Panel>
        </Dialog>

        <!-- Copy to clipboard -->
        <Button size="2" variant="soft" disabled={!clipboard.isAvailable} onclick={copyToClipboard}>
            {#if clipboard.isCopying}
                <CheckAltIcon size="20" data-color="green" style="color: var(--accent-9)" />
            {:else}
                <ClipboardIcon size="20" />
            {/if}
            Copy code to clipboard
        </Button>

        <!-- Download file -->
        <Button size="2" variant="soft" onclick={downloadFile}>
            <FileArrowDownIcon />
            Download file
        </Button>
    </Flexbox>
</Flexbox>

<style>
    .code-content {
        margin: 0;
        padding: var(--space-3);
        font-family: monospace;
        font-size: 12px;
        line-height: 1.6;
        overflow-x: auto;
        background-color: var(--color-background-0);
        color: var(--color);
        white-space: pre;
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }
</style>
