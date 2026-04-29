<script lang="ts">
    import { Flex, Text } from 'svxui';
    import TOC from './toc.svelte';
</script>

<Flex justify="start" direction="column" gap="3">
    <Text as="h4" size="5" weight="bold" class="m-0">On this page</Text>
    <TOC />
</Flex>
