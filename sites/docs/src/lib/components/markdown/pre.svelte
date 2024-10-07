<script lang="ts">
    import { createCopy } from '../code/copy';
    import CopyCodeButton from '../code/CopyCodeButton.svelte';

    const { copied, codeString, copyCode, setCodeString } = createCopy();
</script>

<pre use:setCodeString {...$$restProps}>
    <slot />	
</pre>

<CopyCodeButton copied={$copied} on:click={() => copyCode($codeString)} />
