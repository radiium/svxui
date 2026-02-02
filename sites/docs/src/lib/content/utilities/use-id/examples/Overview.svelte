<script lang="ts">
    import { Button, useId } from 'svxui';

    let id = $state(useId());
</script>

<Button variant="soft" onclick={() => (id = useId())}>New id</Button>

{id}
