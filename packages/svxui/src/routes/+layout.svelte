<script lang="ts">
    import { rovingfocus, Select, Text, ThemeRootProvider, useThemeRootContext } from '$lib/index.js';
    import '$lib/styles/normalize.css';
    import '$lib/styles/tokens.css';
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
                'floating',
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
            items: ['selectfloat']
        }
    ];
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
                    options={['dark', 'light', 'system']}
                    value={themeRoot.strategy}
                    onValueChange={themeRoot.setStrategy}
                />
            </label>

            <label>
                color:
                <Select
                    options={['neutral', 'blue', 'green', 'yellow', 'orange', 'red']}
                    value={themeRoot.color}
                    onValueChange={themeRoot.setColor}
                />
            </label>

            <label>
                radius:
                <Select
                    options={['none', 'small', 'medium', 'large', 'full']}
                    value={themeRoot.radius}
                    onValueChange={themeRoot.setRadius}
                />
            </label>
        </header>
        <aside>
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
