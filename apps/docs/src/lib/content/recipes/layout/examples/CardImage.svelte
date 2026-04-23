<script lang="ts">
    import { Panel, Flex, Text, Button } from 'svxui';

    const data = {
        title: 'Card title',
        subtitle: 'Card subtitle',
        button: 'Details'
    };
</script>

<Panel size="5" outline style="overflow: hidden;">
    <img src="https://picsum.photos/300/200" alt="Card background" />

    <Flex justify="start" direction="column" gap="3" style="width: 300px;">
        <Flex as="header" justify="start" direction="column">
            <Text size="8" weight="bold">{data.title}</Text>
            <Text size="5" weight="medium" muted>{data.subtitle}</Text>
        </Flex>

        <Flex as="footer" justify="end">
            <Button variant="outline">{data.button}</Button>
        </Flex>
    </Flex>
</Panel>

<style>
    img {
        margin-left: calc(var(--space-5) * -1);
        margin-top: calc(var(--space-5) * -1);
        margin-right: calc(var(--space-5) * -1);
        width: calc(100% + var(--space-5) + var(--space-5));
    }
</style>
