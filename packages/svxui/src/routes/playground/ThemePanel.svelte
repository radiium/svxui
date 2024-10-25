<script lang="ts">
    import Button from '$lib/components/Button/Button.svelte';
    import ButtonIcon from '$lib/components/Button/ButtonIcon.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Floating from '$lib/components/Floating/Floating.svelte';
    import { Card, getThemeContext, Radius } from '$lib/index.js';
    import { Strategies } from '$lib/theme/theme.types.js';
    import ThemePanelCloseIcon from './ThemePanelCloseIcon.svelte';
    import ThemePanelOpenIcon from './ThemePanelOpenIcon.svelte';

    const { strategy, setStrategy, radius, setRadius } = getThemeContext();

    let isOpen = true;
</script>

<ButtonIcon size="2" radius="medium" variant="outline" on:click={() => (isOpen = !isOpen)}>
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
                                on:click={() => setStrategy(item)}
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
                                on:click={() => setRadius(item)}
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
