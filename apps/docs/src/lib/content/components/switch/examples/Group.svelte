<script lang="ts">
    import { Flexbox, Switch } from 'svxui';

    let group = $state(['1']);
</script>

<Flexbox gap="6" direction="column" align="center" style="width: 300px;">
    group: {JSON.stringify(group)}

    <Flexbox gap="3" direction="column" align="center">
        <label>
            <Switch name="checkboxGroup" value="1" bind:group />
            label 1
        </label>
        <label>
            <Switch name="checkboxGroup" value="2" bind:group />
            label 2
        </label>
        <label>
            <Switch name="checkboxGroup" value="3" bind:group />
            label 3
        </label>
    </Flexbox>
</Flexbox>
