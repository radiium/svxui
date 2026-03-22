<script lang="ts">
    import { Button, useId } from 'svxui';

    let id = $state(useId());
    const updateId = () => (id = useId());
</script>

<Button variant="soft" onclick={updateId}>New id</Button>

{id}
