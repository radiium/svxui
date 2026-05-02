<script lang="ts">
    import { Button, Flex, Panel, Text } from 'svxui';

    const items = [
        { id: '1', firstName: 'Emma', lastName: 'Dupont', email: 'emma.dupont@example.com' },
        { id: '2', firstName: 'Lucas', lastName: 'Martin', email: 'lucas.martin@example.com' },
        { id: '3', firstName: 'Sofia', lastName: 'Rossi', email: 'sofia.rossi@example.com' },
        { id: '4', firstName: 'James', lastName: 'Walker', email: 'james.walker@example.com' },
        { id: '5', firstName: 'Léa', lastName: 'Bernard', email: 'lea.bernard@example.com' },
        { id: '6', firstName: 'Noah', lastName: 'Schmidt', email: 'noah.schmidt@example.com' }
    ];
</script>

<Flex justify="start" direction="column" gap="3" width="100%" maxWidth="400px">
    {#each items as { id, firstName, lastName, email } (id)}
        <Panel variant="clear" outline p="3" radius="large" fullWidth>
            <Flex justify="start" align="center" gap="4" width="100%">
                <img src="https://picsum.photos/40/40" alt="Card image item {id}" style:border-radius="50%" />
                <Flex
                    justify="start"
                    direction="column"
                    minWidth="10px"
                    flexGrow="1"
                    flexShrink="1"
                    flexBasis="auto"
                >
                    <Text size="5" weight="medium" truncate>{firstName} {lastName}</Text>
                    <Text size="3" muted truncate>{email}</Text>
                </Flex>
                <Button variant="outline" size="2">Manage</Button>
            </Flex>
        </Panel>
    {/each}
</Flex>
