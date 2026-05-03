<script lang="ts">
    import { beforeNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import type { NavSection } from '$lib/types';
    import type { Snippet } from 'svelte';
    import { onMount } from 'svelte';
    import { innerWidth } from 'svelte/reactivity/window';
    import { Button } from 'svxui';
    import ListIcon from '../icons/ListIcon.svelte';
    import XIcon from '../icons/XIcon.svelte';
    import BackgroundDots from './BackgroundDots.svelte';
    import MainHeader from './MainHeader.svelte';
    import MainNavigation from './MainNavigation.svelte';
    import TocDesktop from './toc/toc-desktop.svelte';
    import TocMobile from './toc/toc-mobile.svelte';

    interface Props {
        navigation: NavSection[];
        children?: Snippet;
    }

    let { navigation, children }: Props = $props();

    let isHomePage = $derived(page.url.pathname === '/');
    let isBasePage = $derived(
        navigation
            .find((section) => section.category === 'base')
            ?.pages.some((p) => p.slugFull === page.url.pathname)
    );

    let mobileMenuOpen = $state(false);
    const toggleMenu = () => (mobileMenuOpen = !mobileMenuOpen);
    const openMenu = () => (mobileMenuOpen = true);
    const closeMenu = () => (mobileMenuOpen = false);

    beforeNavigate((navigation) => {
        if (mobileMenuOpen && (innerWidth.current ?? 0) < 769) {
            closeMenu();
            navigation.cancel();
        }
    });

    // Swipe-to-open/close mobile nav
    const EDGE_THRESHOLD = 30; // px from left edge to start tracking
    const SWIPE_THRESHOLD = 60; // px horizontal to trigger open/close
    let touchStartX = 0;
    let touchStartY = 0;
    let tracking = false;

    function onTouchStart(e: TouchEvent) {
        if ((innerWidth.current ?? 0) >= 769) return;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        tracking = touchStartX <= EDGE_THRESHOLD || mobileMenuOpen;
    }

    function onTouchEnd(e: TouchEvent) {
        if (!tracking) return;

        tracking = false;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

        if (deltaX > SWIPE_THRESHOLD && !mobileMenuOpen) {
            openMenu();
        } else if (deltaX < -SWIPE_THRESHOLD && mobileMenuOpen) {
            closeMenu();
        }
    }

    onMount(() => {
        // passive: false required to call preventDefault and block scroll during horizontal swipe
        function onTouchMove(e: TouchEvent) {
            if (!tracking) return;
            const deltaX = e.touches[0].clientX - touchStartX;
            const deltaY = e.touches[0].clientY - touchStartY;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                e.preventDefault();
            }
        }
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        return () => document.removeEventListener('touchmove', onTouchMove);
    });
</script>

<svelte:document ontouchstart={onTouchStart} ontouchend={onTouchEnd} />

<!-- Fixed background -->
{#if !isBasePage}
    <div class="bg">
        <BackgroundDots />
    </div>
{/if}

{#if !isHomePage}
    <!-- TOC -->
    <aside class="toc" aria-label="Table of content">
        <div class="desktop">
            <TocDesktop />
        </div>
        <div class="mobile">
            <TocMobile />
        </div>
    </aside>

    <!-- Navigation overlay -->
    {#if mobileMenuOpen}
        <div class="nav-overlay" role="presentation" onclick={closeMenu}></div>
    {/if}

    <!-- Navigation -->
    <aside class="nav" class:nav-open={mobileMenuOpen}>
        <MainNavigation {navigation} onSelect={closeMenu} />
    </aside>
{/if}

<!-- Header -->
<header>
    {#if !isHomePage}
        <div class="menu-toggle">
            <Button iconOnly color="neutral" radius="full" onclick={toggleMenu}>
                {#if mobileMenuOpen}
                    <XIcon />
                {:else}
                    <ListIcon />
                {/if}
            </Button>
        </div>
    {/if}
    <MainHeader />
</header>

<!-- Content -->
<div class="content" class:is-home-page={isHomePage}>
    <main>
        {@render children?.()}
    </main>
</div>

<style>
    /* Fixed background */
    .bg {
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
    }

    /* Header */
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--header-height);
        z-index: 1;
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: 0 var(--space-3);
        background-color: var(--color-background-1);
        border-bottom: 1px solid var(--neutral-a5);
    }

    /* Nav — mobile (overlay) */
    .nav {
        position: fixed;
        top: var(--header-height);
        left: 0;
        height: calc(100vh - var(--header-height));
        width: var(--nav-width);
        z-index: 1;
        overflow-y: auto;
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        background-color: var(--color-background-1);
        border-right: 1px solid var(--neutral-a5);
        padding: var(--space-4) var(--space-3);

        &.nav-open {
            transform: translateX(0);
        }
    }

    /* Overlay backdrop mobile */
    .nav-overlay {
        position: fixed;
        inset: 0;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        animation: fadeIn 0.25s ease;
    }

    /* TOC — mobile (bar under the header, full width) */
    .toc {
        position: fixed;
        top: var(--header-height);
        left: 0;
        right: 0;
        min-height: var(--header-height);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        overflow: hidden;
        background-color: var(--color-background-1);
        border-bottom: 1px solid var(--neutral-a5);

        .mobile {
            width: 100%;
        }

        .desktop {
            display: none;
        }
    }

    /* Main — compensates all fixed elements  */
    .content {
        margin-top: calc(var(--header-height) * 2); /* header + toc bar */
        min-width: 0;
        padding: var(--space-5) var(--space-3);

        main {
            max-width: 768px;
            margin: 0 auto;
        }

        &.is-home-page {
            margin-top: var(--header-height); /* header + toc bar */
        }
    }

    /* Burger (mobile only) */
    .menu-toggle {
        display: flex;
        margin-left: auto;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Medium screen: nav sidebar visible, toc below the header */
    @media (min-width: 769px) {
        .nav {
            top: var(--header-height);
            height: calc(100vh - var(--header-height));
            transform: none;
            transition: none;
        }

        /* TOC se décale à droite de la nav */
        .toc {
            left: var(--nav-width);
        }

        .content {
            margin-left: var(--nav-width);
            padding: var(--space-7) var(--space-5);

            &.is-home-page {
                margin-left: 0;
            }
        }

        .menu-toggle {
            display: none;
        }
    }

    /* Wide screen : TOC right sidebar */
    @media (min-width: 1025px) {
        .toc {
            top: var(--header-height);
            left: auto;
            right: 0;
            width: var(--toc-width);
            height: calc(100vh - var(--header-height));
            overflow-y: auto;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            border-left: 1px solid var(--neutral-a5);
            border-bottom: none;
            padding: var(--space-4) var(--space-4);
            background-color: var(--color-background-1);
            border-bottom: 1px solid var(--neutral-a5);

            .mobile {
                display: none;
            }
            .desktop {
                display: block;
            }
        }

        .content {
            margin-top: var(--header-height); /* no more toc bar */
            margin-left: var(--nav-width);
            margin-right: var(--toc-width);
            padding: var(--space-9) var(--space-7);

            &.is-home-page {
                margin-left: 0;
                margin-right: 0;
            }
        }
    }
</style>
