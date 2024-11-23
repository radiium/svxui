<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { createCopy } from '../code/copy';
    import CopyCodeButton from '../code/CopyCodeButton.svelte';
    import type { Snippet } from 'svelte';

    type Props = HTMLAttributes<HTMLPreElement> & {
        children?: Snippet;
    };

    let { children, ...rest }: Props = $props();

    const { copied, codeString, copyCode, setCodeString } = createCopy();
</script>

<pre use:setCodeString {...rest} class="markdown">
    {@render children?.()}	
</pre>

<CopyCodeButton copied={$copied} onclick={() => copyCode($codeString)} />
