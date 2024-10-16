<script lang="ts">
    import { Text } from 'sveltr';

    export let id: string = '';
</script>

<Text as="h1" size="8" weight="bold" {id} class="markdown mb-3" {...$$restProps}>
    <slot />
</Text>
