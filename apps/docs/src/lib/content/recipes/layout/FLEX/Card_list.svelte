<script lang="ts">
    import { Button, Flex, Panel, Text } from 'svxui';

    const items = ['1', '2', '3'];
</script>

<Flex justify="start" direction="column" gap="3" width="350px">
    {#each items as item (item)}
        <Panel variant="clear" outline size="3" radius="large" fullWidth>
            <Flex justify="start" align="center" gap="4" width="100%">
                <img
                    src="https://picsum.photos/60/60"
                    alt="Card image item {item}"
                    style="border-radius: 50%;"
                />
                <Flex
                    justify="start"
                    direction="column"
                    gap="1"
                    minWidth="0"
                    flexGrow="1"
                    flexShrink="1"
                    flexBasis="auto"
                >
                    <Text size="5">Title {item}</Text>
                    <Text size="3" muted truncate>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                </Flex>
                <Button variant="outline" size="3">Action</Button>
            </Flex>
        </Panel>
    {/each}
</Flex>
