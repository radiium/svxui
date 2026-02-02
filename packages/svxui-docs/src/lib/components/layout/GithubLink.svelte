<script lang="ts">
    import { PUBLIC_PKG_HOMEPAGE } from '$env/static/public';
    import GithubIcon from '$lib/icons/GithubIcon.svelte';
    import { Button } from 'svxui';
</script>

<a href={PUBLIC_PKG_HOMEPAGE} target="_blank" rel="noreferrer" title="Github page" tabindex="-1">
    <Button variant="clear" size="2" iconOnly class="p-0">
        <GithubIcon />
    </Button>
</a>
