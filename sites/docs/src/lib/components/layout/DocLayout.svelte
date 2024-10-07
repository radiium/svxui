<script lang="ts">
    import List from 'phosphor-svelte/lib/List';
    import X from 'phosphor-svelte/lib/X';
    import { fade } from 'svelte/transition';
    import { Button, useMediaQuery } from 'sveltr';
    import { closeMenu, handleEscape, isMobileMenuOpen, toggleMenu } from './menu';

    const isSmallScreen = useMediaQuery('(max-width: 825px)');
</script>

<div class="wrapper" class:mobile={$isSmallScreen}>
    {#if $isSmallScreen}
        {#if $isMobileMenuOpen}
            <div
                class="backdrop"
                role="button"
                tabindex="-1"
                on:click={closeMenu}
                on:keydown={handleEscape}
                transition:fade={{
                    duration: 250
                }}
            ></div>
        {/if}
        <div id="mobile-menu-btn">
            <Button variant="clear" iconOnly on:click={toggleMenu}>
                {#if $isMobileMenuOpen}
                    <X />
                {:else}
                    <List />
                {/if}
            </Button>
        </div>
    {/if}

    <header>
        <slot name="header" />
    </header>
    <aside class:is-open={$isMobileMenuOpen && $isSmallScreen}>
        <slot name="aside" />
    </aside>
    <main>
        <div class="content">
            <slot name="main" />
        </div>
    </main>
</div>

<style lang="scss">
    .wrapper {
        --header-height: 56px;
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

    .wrapper.mobile {
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
