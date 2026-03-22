<script lang="ts">
    import { Button, longpress, type ButtonVariant } from 'svxui';

    let active = $state(false);
    let variant = $derived<ButtonVariant>(active ? 'solid' : 'soft');
    let label = $derived(active ? 'Pressed !!!' : 'longpress me');
</script>

<Button
    size="4"
    {variant}
    {@attach longpress({
        onLongpressStart: () => (active = true),
        onLongpressEnd: () => (active = false)
    })}
>
    {label}
</Button>
