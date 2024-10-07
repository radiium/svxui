<script lang="ts">
    import { Portal, Card, Badge, Flexbox } from 'sveltr';
</script>

<Flexbox gap="3" class="mb-3">
    <Card class="flex-grow-1">
        Portal source

        <Portal target="#portal-target">
            <Badge color="primary" size="3">Portal content</Badge>
        </Portal>
    </Card>

    <Card id="portal-target" class="flex-grow-1">Portal target</Card>
</Flexbox>
