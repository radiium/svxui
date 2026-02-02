<script lang="ts">
    import { Panel, clickoutside } from 'svxui';

    let count = $state(0);
</script>

count: {count}
<Panel
    outline
    variant="clear"
    size="9"
    {@attach clickoutside({
        onClickOutside: () => count++
    })}
>
    click outside of me
</Panel>
