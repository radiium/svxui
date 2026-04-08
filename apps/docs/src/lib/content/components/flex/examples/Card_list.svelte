<script lang="ts">
    import { Flex, Panel, Text, Button } from 'svxui';

    const items = ['1', '2', '3'];
</script>

<Flex justify="start" direction="column" gap="3" style="width: 350px">
    {#each items as item (item)}
        <Panel variant="clear" outline size="3" radius="large" fullWidth>
            <Flex justify="start" align="center" gap="4" fullWidth>
                <img
                    src="https://picsum.photos/60/60"
                    alt="Card image item {item}"
                    style="border-radius: 50%;"
                />
                <Flex justify="start" direction="column" gap="1" class="flex-auto min-w-0">
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
