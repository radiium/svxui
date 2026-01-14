<script lang="ts">
    import { Button, Flexbox, type ButtonProps } from '$lib/index.js';

    type Props = ButtonProps;

    let { children, ...rest }: Props = $props();
</script>

<Flexbox align="center" gap="2" as="label">
    <Button variant="outline" {...rest}>{@render children?.()}</Button>
</Flexbox>
