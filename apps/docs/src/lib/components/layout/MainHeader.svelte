<script lang="ts">
    import { Flex, Grid } from 'svxui';
    import GithubLink from './GithubLink.svelte';
    import MenuButtonMobile from './MenuButtonMobile.svelte';
    import SearchButtonDesktop from './search/SearchButtonDesktop.svelte';
    import SearchButtonMobile from './search/SearchButtonMobile.svelte';
    import SearchModal from './search/SearchModal.svelte';
    import SettingsButton from './settings/SettingsButton.svelte';
    import TitleLink from './TitleLink.svelte';
    import Version from './Version.svelte';

    type Props = {
        isHomePage: boolean;
        mobileMenuOpen: boolean;
        toggleMenu: () => void;
    };
    let { isHomePage, mobileMenuOpen, toggleMenu }: Props = $props();

    let isSearchOpen = $state(false);
    const openSearch = () => (isSearchOpen = true);
    function handleKeydown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            isSearchOpen = true;
        }
    }
</script>

<Grid cols="1fr 2fr 1fr" width="100%" height="100%">
    <Flex justify="start" align="center">
        {#if !isHomePage}
            <MenuButtonMobile {mobileMenuOpen} onclick={toggleMenu} />
        {/if}
        <TitleLink />
        <Version />
    </Flex>

    <Flex justify="center" align="center">
        {#if !isHomePage}
            <SearchButtonDesktop onclick={openSearch} />
        {/if}
    </Flex>

    <Flex justify="end" align="center">
        <SearchButtonMobile onclick={openSearch} />
        <GithubLink />
        <SettingsButton />
    </Flex>
</Grid>

<svelte:window onkeydown={handleKeydown} />
<SearchModal bind:isOpen={isSearchOpen} onClose={() => (isSearchOpen = false)} />
