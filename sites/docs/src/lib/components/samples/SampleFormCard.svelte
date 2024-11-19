<script lang="ts">
    import { isMobile } from '$lib/utils/reponsive';
    import { Button, Card, Flexbox, Input, Text } from 'svxui';

    interface Props {
        title?: string;
        children?: import('svelte').Snippet;
    }

    let { title = '', children }: Props = $props();
</script>

<Card variant="solid" size={$isMobile ? '1' : '5'} class="width-100">
    <Flexbox direction="column" gap="6" align="start" class="width-100">
        <Card class="width-100">
            <Flexbox direction="column" gap="3" align="start" class="width-100">
                <Text size="5" weight="bold">{title}</Text>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed eros ut turpis finibus
                    mattis.
                </Text>

                <Flexbox
                    gap="3"
                    justify="center"
                    wrap={$isMobile ? 'wrap' : 'nowrap'}
                    align="center"
                    class="mt-4 width-100"
                >
                    <Input placeholder="Email" fullWidth={$isMobile} />
                    <Button variant="soft" fullWidth={$isMobile}>Submit</Button>
                </Flexbox>
            </Flexbox>
        </Card>

        {@render children?.()}
    </Flexbox>
</Card>
