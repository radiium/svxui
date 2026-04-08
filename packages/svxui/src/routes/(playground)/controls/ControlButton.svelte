<script lang="ts">
    import { Button, Flex, type ButtonProps } from '$lib/index.js';

    type Props = ButtonProps;

    let { children, ...rest }: Props = $props();
</script>

<Flex justify="start" align="center" gap="2" as="label">
    <Button variant="outline" tabindex={0} {...rest}>{@render children?.()}</Button>
</Flex>
