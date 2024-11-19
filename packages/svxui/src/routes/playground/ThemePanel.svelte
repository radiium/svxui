<script lang="ts">
    import { Button, ButtonIcon, Card, Flexbox, getThemeContext, Radius, Strategies } from '$lib/index.js';
    import ThemePanelCloseIcon from './ThemePanelCloseIcon.svelte';
    import ThemePanelOpenIcon from './ThemePanelOpenIcon.svelte';

    const { strategy, setStrategy, radius, setRadius } = getThemeContext();

    let isOpen = $state(true);
</script>

<ButtonIcon size="2" radius="medium" variant="outline" onclick={() => (isOpen = !isOpen)}>
    {#if isOpen}
        <ThemePanelCloseIcon />
    {:else}
        <ThemePanelOpenIcon />
    {/if}
</ButtonIcon>

{#if isOpen}
    <aside>
        <Card radius="medium" variant="outline" translucent size="3">
            <Flexbox direction="column" gap="3">
                <Flexbox gap="3">
                    <div class="label">Theme:</div>
                    <div class="value">
                        {#each Strategies as item}
                            <Button
                                radius="small"
                                variant={$strategy === item ? 'soft' : 'outline'}
                                size="1"
                                onclick={() => setStrategy(item)}
                            >
                                {item}
                            </Button>
                        {/each}
                    </div>
                </Flexbox>

                <Flexbox gap="3">
                    <div class="label">Radius:</div>
                    <div class="value">
                        {#each Radius as item}
                            <Button
                                radius="small"
                                variant={$radius === item ? 'soft' : 'outline'}
                                size="1"
                                onclick={() => setRadius(item)}
                            >
                                {item}
                            </Button>
                        {/each}
                    </div>
                </Flexbox>
            </Flexbox>
        </Card>
    </aside>
{/if}

<style lang="scss">
    aside {
        position: fixed;
        top: 60px;
        right: 10px;
        z-index: 1;
        max-width: calc(100vw - 20px);

        .label {
            min-width: 60px;
        }

        .value {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: var(--space-2);
        }
    }
</style>
