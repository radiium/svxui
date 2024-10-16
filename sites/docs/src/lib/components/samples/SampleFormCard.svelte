<script lang="ts">
    import { Button, Card, Flexbox, Input, Text } from 'svxui';

    export let title: string = '';
</script>

<Card variant="solid">
    <Flexbox direction="column" gap="6" align="start">
        <Card style="max-width: 300px">
            <Flexbox direction="column" gap="3" align="start">
                <Text size="5" weight="bold">{title}</Text>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed eros ut turpis finibus
                    mattis.
                </Text>

                <Flexbox gap="3" justify="center" align="center" class="mt-4">
                    <Input placeholder="Email" />
                    <Button variant="soft">Submit</Button>
                </Flexbox>
            </Flexbox>
        </Card>

        <slot />
    </Flexbox>
</Card>
