<script>
    import { page } from '$app/state';
    import { Flex } from '$lib/index.js';
</script>

<Flex justify="start" direction="column" gap="3" p="9">
    <h1>{page.status}</h1>
    <p>
        <code>
            {page.error?.message}
        </code>
    </p>
</Flex>
