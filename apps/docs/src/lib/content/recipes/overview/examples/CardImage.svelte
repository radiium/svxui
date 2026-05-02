<script lang="ts">
    import { Box, Button, Flex, Panel, Text } from 'svxui';

    const data = {
        title: 'Card title',
        subtitle: 'Card subtitle',
        button: 'Details'
    };
</script>

<Panel p="5" outline class="overflow-hidden">
    <Box mt="-5" mx="-5">
        <img src="https://picsum.photos/300/200" alt="Card background" class="w-full" />
    </Box>

    <Flex justify="start" direction="column" gap="3" width="300px">
        <Flex as="header" justify="start" direction="column">
            <Text size="8" weight="bold">{data.title}</Text>
            <Text size="5" weight="medium" muted>{data.subtitle}</Text>
        </Flex>

        <Flex as="footer" justify="end">
            <Button variant="outline">{data.button}</Button>
        </Flex>
    </Flex>
</Panel>
