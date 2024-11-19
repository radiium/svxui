<script lang="ts">
    import Button from './button.svelte';
    import type { ButtonIconProps } from '../types.js';

    let { ...props }: ButtonIconProps = $props();
</script>

<Button {...props} {...props} iconOnly>
    {@render props.children?.()}
</Button>
