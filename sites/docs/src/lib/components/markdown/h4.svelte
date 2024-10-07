<script lang="ts">
    import { Text } from 'svxui';

    export let id: string = '';
</script>

<Text as="h4" size="4" weight="bold" {id} class="markdown mb-3" {...$$restProps}>
    <slot />
</Text>
