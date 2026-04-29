<script lang="ts">
    import { AllRadixColors, Button, Flex, Modes, Radiuses, rovingfocus, Text, useTheme } from 'svxui';

    const theme = useTheme();
</script>

<Flex justify="start" direction="column" gap="3" width="400px" maxWidth="85vw" data-color="neutral">
    <Flex justify="start" gap="2" direction="column" class="w-full">
        <Text size="4" weight="medium">Theme modes:</Text>
        <Flex
            justify="start"
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
                    class="settings-button"
                >
                    {item}
                </Button>
            {/each}
        </Flex>
    </Flex>

    <Flex justify="start" gap="2" direction="column" width="100%">
        <Text size="4" weight="medium">Radius:</Text>
        <Flex
            justify="start"
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
                    class="settings-button"
                >
                    {item}
                </Button>
            {/each}
        </Flex>
    </Flex>

    <Flex justify="start" gap="2" direction="column">
        <Text size="4" weight="medium">Accent color:</Text>
        <Flex
            justify="start"
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
                    class="settings-button"
                ></Button>
            {/each}
        </Flex>
    </Flex>
</Flex>

<style>
    :global(.settings-button) {
        &:focus-visible,
        &.button-active {
            outline: 2px solid white;
            outline-offset: 1px;
        }
    }
</style>
