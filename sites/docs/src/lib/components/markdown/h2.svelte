<script lang="ts">
    import { Text } from 'sveltr';

    export let id: string = '';
</script>

<Text as="h2" size="6" weight="bold" {id} class="mt-7 mb-3" {...$$restProps}>
    <slot />
</Text>
