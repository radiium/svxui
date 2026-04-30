<script lang="ts">
    import { Panel, Flex, Text, Button } from 'svxui';
</script>

<Panel p="5" variant="solid">
    <Flex justify="start" direction="column" gap="3" width="300px">
        <Flex justify="start" as="header" direction="column">
            <Text size="8" weight="bold" as="h2" class="m-0">Card title</Text>
            <Text size="5" weight="medium" as="p" muted class="m-0">Card subtitle</Text>
        </Flex>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt elit mattis sem mollis,
            sit amet dapibus arcu commodo. Morbi non aliquam sapien. Quisque pretium.
        </div>
        <Flex as="footer" justify="end">
            <Button variant="outline">Details</Button>
        </Flex>
    </Flex>
</Panel>
