<script lang="ts">
    import { Text } from 'svxui';

    export let id: string = '';
</script>

<Text as="h2" size="6" weight="bold" {id} class="markdown mt-7 mb-3" {...$$restProps}>
    <slot />
</Text>
