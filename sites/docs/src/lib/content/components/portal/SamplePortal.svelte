<script lang="ts">
    import { isMobile } from '$lib/utils/reponsive';
    import { Portal, Card, Badge, Flexbox, Text } from 'svxui';
</script>

<Card>
    <Flexbox gap="3" wrap="nowrap" direction={$isMobile ? 'column' : 'row'}>
        <Card variant="outline" style="min-height: 100%">
            <Flexbox gap="3" direction="column">
                <Text>Source container</Text>
                <Portal target="#portal-target">
                    <Card variant="surface" color="primary">Portal content</Card>
                </Portal>
            </Flexbox>
        </Card>

        <Card variant="outline">
            <Flexbox gap="3" direction="column">
                <Text>Destination container</Text>
                <div id="portal-target"></div>
            </Flexbox>
        </Card>
    </Flexbox>
</Card>
