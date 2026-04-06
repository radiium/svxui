<script lang="ts">
    import SelectOption from '$lib/components/select/components/select-option.svelte';
    import ThemeProvider from '$lib/components/theme/components/theme-provider.svelte';
    import { AllRadixColors, Modes, Radiuses, useTheme } from '$lib/components/theme/index.js';
    import { rovingfocus, Select, Text } from '$lib/index.js';
    import { type Snippet } from 'svelte';
    // Styles
    import '$lib/styles/normalize.css';
    import '$lib/styles/tokens.css';
    import '$lib/styles/utilities.css';
    import './all-colors.css';

    type Props = {
        children?: Snippet;
    };

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
                'layout',
                'listbox',
                'panel',
                'portal',
                'select',
                'tabs',
                'text',
                'theme-scope'
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
</script>

<ThemeProvider color="neutral" radius="medium">
    {@const themeRoot = useTheme()}
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
                    value={themeRoot.mode}
                    onValueChange={(newValue) => newValue && themeRoot.setMode(newValue)}
                >
                    {#each Modes as value (value)}
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
                    {#each AllRadixColors as value (value)}
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
                    {#each Radiuses as value (value)}
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
                                        href={'/' + section.name + '/' + item}
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
</ThemeProvider>

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
