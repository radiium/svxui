<script lang="ts">
    import { page } from '$app/state';
    import { Button, Flex, Text } from 'svxui';
</script>

<svelte:head>
    <title>{page.status} | SVXUI</title>
</svelte:head>

<Flex justify="center" align="center" direction="column" gap="4" height="100%">
    <Text size="9" weight="bold" muted>{page.status}</Text>
    <Text size="6" weight="medium">{page.error?.message ?? 'Something went wrong'}</Text>
    <Button as="a" href="/docs" variant="outline" size="3">Back to docs</Button>
</Flex>
