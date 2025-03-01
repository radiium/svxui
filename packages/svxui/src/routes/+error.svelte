<script>
    import { page } from '$app/state';
    import { Flexbox } from '$lib/index.js';
</script>

<Flexbox direction="column" gap="3" class="p-9">
    <h1>{page.status}</h1>
    <p>
        <code>
            {page.error?.message}
        </code>
    </p>
</Flexbox>
