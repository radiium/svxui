<script lang="ts">
    import { Checkbox, Flexbox } from 'svxui';

    const items = ['1', '2', '3'];
    let group = $state(['1']);
</script>

group: {JSON.stringify(group)}

<Flexbox gap="3" direction="column" align="center">
    {#each items as value (value)}
        <Flexbox as="label" align="center" gap="2">
            <Checkbox name="checkboxGroup" {value} bind:group />
            label {value}
        </Flexbox>
    {/each}
</Flexbox>
