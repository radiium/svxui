<script lang="ts">
    import Button from './Button.svelte';
    import type { ButtonIconProps } from './Button.types.js';
    type $$Props = ButtonIconProps;
</script>

<Button {...$$props} {...$$restProps} iconOnly on:click on:submit on:focus on:blur>
    <slot />
</Button>
