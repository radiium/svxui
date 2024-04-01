<script lang="ts">
    import Card from '$lib/components/Card/Card.svelte';
    import Text from '$lib/components/Text/Text.svelte';
    import Input from '$lib/components/Input/Input.svelte';
    import Button from '$lib/components/Button/Button.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';

    export let title: string = '';
</script>

<Card>
    <Flexbox direction="column" gap="6" alignItems="start">
        <Card style="max-width: 300px">
            <Flexbox direction="column" gap="3" alignItems="start">
                <Text size="5" weight="bold">{title}</Text>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed eros ut turpis finibus
                    mattis.
                </Text>

                <Flexbox gap="3" justify="center" alignItems="center" class="mt-4">
                    <Input placeholder="Email" />
                    <Button variant="soft">Submit</Button>
                </Flexbox>
            </Flexbox>
        </Card>

        <slot />
    </Flexbox>
</Card>
