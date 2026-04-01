<script lang="ts">
    import { AllRadixColors, Button, Flexbox, Modes, Radiuses, rovingfocus, Text, useTheme } from 'svxui';

    const theme = useTheme();
</script>

<Flexbox direction="column" gap="3" class="settings-content" data-color="neutral">
    <Flexbox gap="2" direction="column" class="w-100">
        <Text size="4" weight="medium">Theme strategy:</Text>
        <Flexbox
            gap="2"
            wrap="wrap"
            {@attach rovingfocus({ loop: true, activateOnFocus: true, orientation: 'horizontal' })}
        >
            {#each Modes as item (item)}
                <Button
                    data-roving-item
                    radius="small"
                    variant={theme.mode === item ? 'solid' : 'outline'}
                    size="2"
                    onclick={() => theme.setMode(item)}
                >
                    {item}
                </Button>
            {/each}
        </Flexbox>
    </Flexbox>

    <Flexbox gap="2" direction="column" class="w-100">
        <Text size="4" weight="medium">Radius:</Text>
        <Flexbox
            gap="2"
            wrap="wrap"
            {@attach rovingfocus({ loop: true, activateOnFocus: true, orientation: 'horizontal' })}
        >
            {#each Radiuses as item (item)}
                <Button
                    data-roving-item
                    radius="small"
                    variant={theme.radius === item ? 'solid' : 'outline'}
                    size="2"
                    onclick={() => theme.setRadius(item)}
                >
                    {item}
                </Button>
            {/each}
        </Flexbox>
    </Flexbox>

    <Flexbox gap="2" direction="column">
        <Text size="4" weight="medium">Accent color:</Text>
        <Flexbox
            gap="2"
            wrap="wrap"
            {@attach rovingfocus({ loop: true, activateOnFocus: true, orientation: 'horizontal' })}
        >
            {#each AllRadixColors as item (item)}
                <Button
                    data-roving-item
                    active={theme.color === item}
                    color={item}
                    onclick={() => theme.setColor(item)}
                    iconOnly
                    radius="full"
                    title={item}
                ></Button>
            {/each}
        </Flexbox>
    </Flexbox>
</Flexbox>

<style>
    :global(.settings-content) {
        width: 400px;
        max-width: 85vw;
    }

    :global(.settings-content .button) {
        &:focus-visible,
        &.button-active {
            outline: 2px solid white;
            outline-offset: 1px;
        }
    }
</style>
