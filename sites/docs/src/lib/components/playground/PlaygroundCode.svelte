<script lang="ts">
    import { run } from 'svelte/legacy';

    import { createCopy } from '../code/copy';
    import CopyCodeButton from '../code/CopyCodeButton.svelte';
    import { shiki } from '../code/shiki';

    type Props = {
        template?: string;
        templateProps?: { key: string; value: string }[];
    };

    let { template = '', templateProps = [] }: Props = $props();

    const { copyCode, copied } = createCopy();

    let code = $derived.by(() => {
        return templateProps.reduce((acc, next) => {
            return acc.replace(next.key, next.value ? ` ${next.value}` : '').trim();
        }, template);
    });

    let highlighted = $derived.by(() => {
        if ($shiki!.codeToHtml) {
            return $shiki.codeToHtml(code, { lang: 'svelte' });
        }
        return '';
    });
</script>

{#if highlighted}
    <figure data-rehype-pretty-code-figure data-code-playground>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html highlighted}
        <CopyCodeButton copied={$copied} onclick={() => copyCode(code)} />
    </figure>
{/if}
