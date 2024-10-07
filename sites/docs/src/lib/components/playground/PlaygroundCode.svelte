<script lang="ts">
    import { createCopy } from '../code/copy';
    import CopyCodeButton from '../code/CopyCodeButton.svelte';
    import { shiki } from '../code/shiki';

    export let template = ':props';
    export let templateSlot = ':slot';
    export let propsString = '';

    const { copyCode, copied } = createCopy();
    let code = '';
    let highlighted = '';
    $: {
        code = template.replace(':props', propsString ? ' ' + propsString : '').trim();
        if (templateSlot) {
            code = code.replace(':slot', templateSlot);
        }
        if ($shiki!.codeToHtml) {
            highlighted = $shiki.codeToHtml(code, { lang: 'svelte' });
        }
    }
</script>

{#if highlighted}
    <figure data-rehype-pretty-code-figure data-code-playground>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html highlighted}
        <CopyCodeButton copied={$copied} on:click={() => copyCode(code)} />
    </figure>
{/if}
