<script lang="ts">
    import { navigating } from '$app/state';
    import PageToc from '$lib/markdown/components/PageToc.svelte';
    import type { Snippet } from 'svelte';
    import { layout } from '../utils/layout-state.svelte';
    import BackgroundDots from './components/BackgroundDots.svelte';
    import GithubLink from './components/GithubLink.svelte';
    import MenuButtonClose from './components/MenuButtonClose.svelte';
    import MenuButtonOpen from './components/MenuButtonOpen.svelte';
    import Navigation from './components/Navigation.svelte';
    import SettingsButton from './components/SettingsButton.svelte';
    import TitleLink from './components/TitleLink.svelte';
    import Version from './components/Version.svelte';

    type Props = {
        children?: Snippet;
    };

    let { children }: Props = $props();

    let mainRef: HTMLElement | undefined = $state();

    $effect(() => {
        if (navigating.from) {
            mainRef?.scrollTo({ top: 0, behavior: 'instant' });
        }
    });
</script>

<div
    class="layout-wrapper"
    class:is-home-page={layout.isHomePage}
    class:has-menu-mobile={layout.hasMenuMobile}
    class:has-toc={layout.hasTOC}
    class:is-mobile={layout.isMobile}
    class:is-tablet={layout.isTablet}
    class:is-laptop={layout.isLaptop}
    class:is-desktop={layout.isDesktop}
    class:is-menu-open={layout.isMenuOpen}
>
    <!-- Background -->
    {#if layout.isHomePage}
        <div class="background">
            <BackgroundDots />
        </div>
    {/if}

    <!-- Main content -->
    <main bind:this={mainRef}>
        <div class="content">
            <div class="inner">
                {@render children?.()}
            </div>
        </div>
    </main>

    <!-- Main header -->
    <header class="main-header">
        {#if layout.hasMenuMobile}
            <MenuButtonOpen />
        {/if}
        <TitleLink />
        <Version />
        <div class="flex-auto"></div>
        <GithubLink />
        <SettingsButton />
    </header>

    <!-- Main nav mobile overlay -->
    {#if layout.hasMenuMobile && layout.isMenuOpen}
        <div
            class="overlay"
            role="button"
            onclick={layout.close}
            onkeydown={layout.handleEscape}
            tabindex="-1"
        ></div>
    {/if}

    <!-- Main nav -->
    {#if layout.hasMenu}
        <aside class="main-nav">
            {#if layout.hasMenuMobile}
                <header class="main-nav-header">
                    <!-- <TitleLink />
                    <Version />
                     -->
                    <div class="flex-auto"></div>
                    <MenuButtonClose />
                </header>
            {/if}
            <div class="main-nav-content">
                <Navigation />
            </div>
        </aside>
    {/if}

    <!-- Page nav -->
    {#if layout.hasTOC}
        <aside class="page-nav">
            <PageToc />
        </aside>
    {/if}
</div>

<style>
    .layout-wrapper {
        --header-height: 50px;
        --aside-width: 250px;
        --toc-width: 250px;
        --toc-gap: var(--space-5);
        position: relative;

        &.is-home-page {
            header.main-header {
                background: transparent;
                border: none;
            }
            main {
                padding-top: 10rem;
                padding-left: 0;
                padding-right: 0;
            }
        }

        &.is-mobile {
            main {
                .content {
                    padding: 0 var(--space-4) var(--space-7) var(--space-4);
                }
            }
        }

        &.has-menu-mobile {
            .overlay {
                transition: transform ease 0.2s;
            }
            aside.main-nav {
                top: 0;
                height: 100%;
                transform: translateX(calc(var(--aside-width) * -1));
                transition: transform ease 0.2s;
                border: none;

                header.main-nav-header {
                    height: var(--header-height);
                    width: 100%;
                    padding: 0 var(--space-3);
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    background-color: var(--color-background-0);
                }
            }

            main {
                padding-left: 0;
            }

            &.is-menu-open {
                aside.main-nav {
                    transform: translateX(0);
                }
            }
        }

        &.has-toc {
            main {
                padding-right: var(--toc-width);
            }
        }

        .background {
            z-index: -1;
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
        }

        main {
            z-index: 0;
            padding-top: var(--header-height);
            padding-left: var(--aside-width);

            .content {
                padding: var(--space-5) var(--space-7) var(--space-9) var(--space-7);
            }
        }

        .overlay {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
        }

        aside.main-nav {
            position: fixed;
            top: var(--header-height);
            left: 0;
            bottom: 0;
            width: var(--aside-width);
            height: calc(100% - var(--header-height));
            background-color: var(--color-background-0);
            border-right: 1px solid var(--accent-a5);
            overflow: hidden;
            display: flex;
            flex-direction: column;

            .main-nav-content {
                overflow: auto;
            }
        }

        aside.page-nav {
            position: fixed;
            top: var(--header-height);
            right: 0;
            bottom: 0;
            width: var(--toc-width);
            padding-top: calc(var(--space-7) + var(--space-5));
            padding-right: var(--space-3);
            padding-bottom: var(--space-5) 0;
        }

        header.main-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: var(--header-height);
            width: 100%;
            background-color: var(--color-background-0);
            border-bottom: 1px solid var(--accent-a5);
            padding: 0 var(--space-5);
            overflow: visible;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--space-2);
        }
    }
</style>
