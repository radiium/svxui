<script lang="ts">
    import {
        Button,
        Flexbox,
        rovingfocus,
        Text,
        useThemeRootContext,
        type Color,
        type Radius,
        type StrategyType
    } from 'svxui';

    const themeRoot = useThemeRootContext();

    const strategies: StrategyType[] = ['system', 'light', 'dark'];
    const radius: Radius[] = ['none', 'small', 'medium', 'large', 'full'];
    const colors: Color[] = ['neutral', 'green', 'blue', 'yellow', 'orange', 'red'];
</script>

<Flexbox direction="column" gap="3" class="settings-content" data-color="neutral">
    <Flexbox gap="2" direction="column" class="w-100">
        <Text size="4" weight="medium">Theme strategy:</Text>
        <Flexbox
            gap="2"
            wrap="wrap"
            {@attach rovingfocus({ loop: true, activateOnFocus: true, orientation: 'horizontal' })}
        >
            {#each strategies as item (item)}
                <Button
                    data-roving-item
                    radius="small"
                    variant={themeRoot.strategy === item ? 'solid' : 'outline'}
                    size="2"
                    onclick={() => themeRoot.setStrategy(item)}
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
            {#each radius as item (item)}
                <Button
                    data-roving-item
                    radius="small"
                    variant={themeRoot.radius === item ? 'solid' : 'outline'}
                    size="2"
                    onclick={() => themeRoot.setRadius(item)}
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
            {#each colors as item (item)}
                <Button
                    data-roving-item
                    active={themeRoot.color === item}
                    color={item}
                    onclick={() => themeRoot.setColor(item)}
                >
                    {item}
                </Button>
            {/each}
        </Flexbox>
    </Flexbox>
</Flexbox>

<style>
    :global(.settings-content) {
        max-width: 85vw;
    }
</style>
