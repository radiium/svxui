<script lang="ts">
    import { Flex, Text } from 'svxui';
    import TOC from './toc.svelte';
</script>

<Flex justify="start" direction="column">
    <Text as="h4" size="5" weight="bold" class="mt-0 mb-3">On this page</Text>
    <TOC />
</Flex>
