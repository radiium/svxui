<script lang="ts">
    import SelectOption from '$lib/components/select/components/select-option.svelte';
    import {
        rovingfocus,
        Select,
        Text,
        ThemeRootProvider,
        useThemeRootContext,
        type StrategyType,
        type Color,
        type Radius
    } from '$lib/index.js';
    import '$lib/styles/normalize.css';
    import '$lib/styles/tokens.css';
    import '$lib/styles/theme.default.css';
    import '$lib/styles/utilities.css';
    import { type Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();

    const sections = [
        {
            name: 'attachments',
            items: [
                'clickoutside', //
                'focustrap',
                'longpress',
                'portal',
                'rovingfocus',
                'scrolllock'
            ]
        },
        {
            name: 'components',
            items: [
                'accordion', //
                'badge',
                'button',
                'dialog',
                'floating',
                'input-number',
                'listbox',
                'panel',
                'portal',
                'select',
                'tabs',
                'text'
            ]
        },
        {
            name: 'utilities',
            items: [
                'hotkeys', //
                'persistedstate',
                'selection'
            ]
        },
        {
            name: 'experiments',
            items: [
                'selectfloat', //
                'xp'
            ]
        }
    ];

    const strategies = ['dark', 'light', 'system'] as StrategyType[];
    const colors = ['neutral', 'blue', 'green', 'yellow', 'orange', 'red'] as Color[];
    const radius = ['none', 'small', 'medium', 'large', 'full'] as Radius[];
</script>

<ThemeRootProvider>
    {@const themeRoot = useThemeRootContext()}
    <div class="container">
        <header>
            <h1>
                <Text weight="bold">SVXUI/</Text>
                <Text weight="bold" muted>PLAYGROUND</Text>
            </h1>

            <div class="flex-auto"></div>

            <label>
                theme:
                <Select
                    value={themeRoot.strategy}
                    onValueChange={(newValue) => newValue && themeRoot.setStrategy(newValue)}
                >
                    {#each strategies as value (value)}
                        <SelectOption {value}>{value}</SelectOption>
                    {/each}
                </Select>
            </label>

            <label>
                color:
                <Select
                    value={themeRoot.color}
                    onValueChange={(newValue) => newValue && themeRoot.setColor(newValue)}
                >
                    {#each colors as value (value)}
                        <SelectOption {value}>{value}</SelectOption>
                    {/each}
                </Select>
            </label>

            <label>
                radius:
                <Select
                    value={themeRoot.radius}
                    onValueChange={(newValue) => newValue && themeRoot.setRadius(newValue)}
                >
                    {#each radius as value (value)}
                        <SelectOption {value}>{value}</SelectOption>
                    {/each}
                </Select>
            </label>
        </header>
        <aside>
            <div class="box"></div>
            <ul {@attach rovingfocus({ target: '[data-page]', activateOnFocus: false })}>
                {#each sections as section, i (i)}
                    <li>
                        <Text muted>{section.name}</Text>

                        <ul>
                            {#each section.items as item, j (j)}
                                <li>
                                    <Text
                                        as="a"
                                        underline="auto"
                                        href={'/playground/' + section.name + '/' + item}
                                        data-page
                                    >
                                        {item}
                                    </Text>
                                </li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </aside>
        <main>
            {@render children?.()}
        </main>
    </div>
</ThemeRootProvider>

<style>
    :global(h1) {
        font-size: 3rem;
        font-style: italic;
        line-height: 1.1;
    }
    :global(p) {
        font-size: 2rem;
    }

    :global(h2) {
        margin: 0;
    }

    .container {
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-template-rows: 50px 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;

        header {
            grid-area: 1 / 1 / 2 / 3;
            display: flex;
            align-items: center;
            padding: 0 var(--space-3);
            gap: var(--space-3);
            border-bottom: 1px solid var(--accent-7);

            h1 {
                font-size: 1.5rem;
                margin: 0;
                display: flex;
            }
        }

        aside {
            grid-area: 2 / 1 / 3 / 2;
            border-right: 1px solid var(--accent-7);
            padding: var(--space-3);
            position: relative;

            .box {
                position: absolute;
                z-index: 1;
                top: 0;
                right: 0;
                bottom: 0;
                width: 100px;

                --mask:
                    radial-gradient(
                            16.16px at calc(100% + 7.8px) 50%,
                            #0000 calc(99% - 2px),
                            red calc(101% - 2px) 99%,
                            #0000 101%
                        )
                        calc(50% - 7.5px + 0.5px) calc(50% - 26px)/15px 52px repeat-y,
                    radial-gradient(
                            16.16px at -7.8px 50%,
                            #0000 calc(99% - 2px),
                            red calc(101% - 2px) 99%,
                            #0000 101%
                        )
                        calc(50% + 7.5px) 50%/15px 52px repeat-y;
                -webkit-mask: var(--mask);
                mask: var(--mask);
            }

            > ul {
                list-style: none;
                padding: 0;

                li {
                    > ul {
                        list-style: none;
                        padding-left: var(--space-3);
                    }
                }
            }
        }

        main {
            grid-area: 2 / 2 / 3 / 3;
            padding: var(--space-6);
            width: calc(100vw - 250px);
        }
    }
</style>
