<script lang="ts">
    import { Panel, Flex, Text, Button, Box } from 'svxui';

    const data = {
        title: 'Card title',
        subtitle: 'Card subtitle',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt elit mattis sem mollis, sit amet dapibus arcu commodo. Morbi non aliquam sapien. Quisque pretium.',
        button: 'Details'
    };
</script>

<Box width="300px">
    <Panel size="5" variant="surface" outline>
        <Flex justify="start" direction="column" gap="3">
            <Flex as="header" justify="start" direction="column">
                <Text size="8" weight="bold">{data.title}</Text>
                <Text size="5" weight="medium" muted>{data.subtitle}</Text>
            </Flex>

            <Text>{data.content}</Text>

            <Flex as="footer" justify="end">
                <Button variant="outline">{data.button}</Button>
            </Flex>
        </Flex>
    </Panel>
</Box>
