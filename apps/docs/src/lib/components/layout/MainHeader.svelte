<script lang="ts">
    import GithubLink from './GithubLink.svelte';
    import SearchButton from './search/SearchButton.svelte';
    import SettingsButton from './SettingsButton.svelte';
    import TitleLink from './TitleLink.svelte';
    import Version from './Version.svelte';
</script>

<TitleLink />
<Version />
<div class="flex-auto"></div>
<SearchButton />
<GithubLink />
<SettingsButton />
