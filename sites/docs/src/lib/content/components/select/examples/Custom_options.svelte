<script lang="ts">
    import { Select } from 'svxui';

    const options = [
        {
            id: 1,
            data: 'item 1',
            disabled: false
        },
        {
            id: 2,
            data: 'item 2',
            disabled: false
        },
        {
            id: 3,
            data: 'item 3',
            disabled: true
        }
    ];
</script>

<Select {options} resolveLabel={(option) => option.data} resolveValue={(option) => option.id} />
