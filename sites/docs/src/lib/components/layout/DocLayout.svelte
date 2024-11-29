<script lang="ts">
    import { isTablet, isMobile } from '$lib/utils/reponsive';
    import List from 'phosphor-svelte/lib/List';
    import X from 'phosphor-svelte/lib/X';
    import { fade } from 'svelte/transition';
    import { Button } from 'svxui';
    import { closeMenu, handleEscape, isMobileMenuOpen, toggleMenu } from './menu';
    import type { Snippet } from 'svelte';

    type Props = {
        header?: Snippet;
        aside?: Snippet;
        main?: Snippet;
    };

    let { header, aside, main }: Props = $props();
</script>

<div class="wrapper" class:tablet={$isTablet || $isMobile}>
    {#if $isTablet}
        {#if $isMobileMenuOpen}
            <div
                class="backdrop"
                role="button"
                tabindex="-1"
                onclick={closeMenu}
                onkeydown={handleEscape}
                transition:fade={{
                    duration: 250
                }}
            ></div>
        {/if}
        <div id="mobile-menu-btn">
            <Button variant="clear" iconOnly onclick={toggleMenu}>
                {#if $isMobileMenuOpen}
                    <X />
                {:else}
                    <List />
                {/if}
            </Button>
        </div>
    {/if}

    <header>
        {@render header?.()}
    </header>
    <aside class:is-open={$isMobileMenuOpen && $isTablet}>
        {@render aside?.()}
    </aside>
    <main>
        <div class="content">
            {@render main?.()}
        </div>
    </main>
</div>

<style lang="scss">
    .wrapper {
        --header-height: 60px;
        --header-width: 100%;

        --aside-height: 100%;
        --aside-width: 250px;

        --main-height: 100%;
        --main-width: 100%;

        display: grid;
        grid-template-columns: var(--aside-width) 1fr;
        grid-template-rows: var(--header-height) 1fr;
        gap: 0px 0px;
        grid-template-areas:
            'header header'
            'aside main';
        position: absolute;
        inset: 0 0 0 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: var(--color-background-0);
        color: var(--color);

        .backdrop {
            display: none;
            z-index: 101;
        }

        header,
        aside,
        main {
            border-style: solid;
            border-color: var(--slate-a5);
        }

        header {
            grid-area: header;
            height: var(--header-height);
            width: var(--header-width);
            border-style: solid;
            border-width: 0 0 1px 0;
            position: relative;
            overflow: visible;
        }

        aside {
            grid-area: aside;
            height: var(--aside-height);
            width: var(--aside-width);
            border-style: solid;
            border-width: 0 1px 0 0;
            position: relative;
            overflow: hidden;
        }

        main {
            grid-area: main;
            height: var(--main-height);
            width: var(--main-width);
            border-style: solid;
            border-width: 0 0 0 0;
            position: relative;
            overflow: hidden;

            .content {
                max-width: 900px;
                height: 100%;
                margin: 0 auto;
                overflow: auto;
            }
        }
    }

    #mobile-menu-btn {
        display: flex;
        position: fixed;
        z-index: 99999;
        top: 12px;
        left: 10px;
    }

    .backdrop {
        display: inherit !important;
        z-index: 1;
        position: fixed;
        overflow: hidden;
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        inset: 0px;
        border: none;
        background: rgba(0, 0, 0, 0.4);
    }

    .wrapper.tablet {
        grid-template-columns: 1fr;
        grid-template-rows: var(--header-height) 1fr;
        grid-template-areas:
            'header'
            'main';

        header {
            padding-left: 42px;
        }

        aside {
            grid-area: unset;
            position: fixed;
            height: calc(100vh - var(--header-height));
            top: var(--header-height);
            bottom: 0;
            left: 0;
            transition: transform linear 0.3s;
            transform: translateX(calc(var(--aside-width) * -1));
            z-index: 99999;
            background-color: var(--color-background-0);

            &.is-open {
                transform: translateX(0);
            }
        }
    }
</style>
