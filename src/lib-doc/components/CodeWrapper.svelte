<script lang="ts">
    import Clipboard from 'phosphor-svelte/lib/Clipboard';
    import Check from 'phosphor-svelte/lib/Check';
    import Card from '$lib/components/Card/Card.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import Separator from '$lib/components/Separator/Separator.svelte';

    export let src: string | undefined = undefined;
    export let meta: Record<string, unknown> = {};

    // console.groupCollapsed('CodeWrapper');
    // console.log('src', src);
    // console.log('meta', meta);
    // console.groupEnd();

    let isCopied = false;
    let timeoutId;
    const copyCode = () => {
        if (isCopied || !src) {
            return;
        }

        navigator.clipboard
            .writeText(src)
            .then(() => {
                isCopied = true;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    isCopied = false;
                }, 1800);
            })
            .catch((err) => {
                console.error('Async: Could not copy text: ', err);
            });
    };

    // $: console.log(src ? src.replace(/<pre.*?>.*?<\/pre>/gi, '') : 'no src');
</script>

<Card size="0" class="doc-code-wrapper mt-3 mb-5 {$$slots.example ? 'has-demo' : ''}">
    <Flexbox direction="column">
        {#if $$slots.example}
            <section class="demo-block px-4 py-4" class:column={meta.column}>
                <slot name="example" />
            </section>
        {/if}

        <Separator size="4"/>

        {#if $$slots.code}
            <section class="code-block">
                <div class="display-flex px-5 py-4">
                    {#if !!meta.Wrapper && meta.example}
                        <pre class="language-svelte"><slot name="code" /></pre>
                    {:else}
                        <slot name="code" />
                    {/if}
                </div>

                <Button size="2" class="copy-btn mt-2 mr-2" variant="soft" iconOnly on:click={copyCode}>
                    {#if isCopied}
                        <Check />
                    {:else}
                        <Clipboard />
                    {/if}
                </Button>
            </section>
        {/if}
    </Flexbox>
</Card>

<style lang="scss">
    :global(.light .demo-block) {
        background-color: white;
    }
    :global(.dark .demo-block) {
        background-color: black;
    }

    section {
        &.demo-block {
            display: flex;
            align-items: center;
            gap: var(--space-3);

            &.column {
                flex-direction: column;
                align-items: start;
            }
        }

        &.code-block {
            overflow: hidden;
            position: relative;
            background: var(--background-level-1) !important;

            > div {
                overflow-x: auto;
            }

            :global(.copy-btn) {
                opacity: 0;
                position: absolute;
                right: 0;
                top: 0;
            }

            &:hover {
                :global(.copy-btn) {
                    opacity: 1;
                }
            }
        }
    }
</style>
