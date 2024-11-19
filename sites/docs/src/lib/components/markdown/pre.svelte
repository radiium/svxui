<script lang="ts">
    import { createCopy } from '../code/copy';
    import CopyCodeButton from '../code/CopyCodeButton.svelte';
    interface Props {
        children?: import('svelte').Snippet;
        [key: string]: any;
    }

    let { children, ...rest }: Props = $props();

    const { copied, codeString, copyCode, setCodeString } = createCopy();
</script>

<pre use:setCodeString {...rest} class="markdown">
    {@render children?.()}	
</pre>

<CopyCodeButton copied={$copied} onclick={() => copyCode($codeString)} />
