<script lang="ts">
    import { PUBLIC_PKG_NAME, PUBLIC_PKG_HOMEPAGE } from '$env/static/public';
    import { version } from '$app/environment';
    import GithubIcon from './GithubIcon.svelte';
    import Badge from '$lib/components/Badge/Badge.svelte';
    import ThemeSelect from '$lib/theme/ThemeSelect/ThemeSelect.svelte';
    import Text from '$lib/components/Text/Text.svelte';
    import Button from '$lib/components/Button/Button.svelte';
</script>

<div class="container pl-3 pr-3">
    <div class="side start">
        <a href="/" target="_self" rel="noreferrer" data-sveltekit-preload-data="tap" title={PUBLIC_PKG_NAME}>
            <Text size="7">{PUBLIC_PKG_NAME}</Text>
        </a>
        <Badge title="Version" class="mt-1">v{version}</Badge>
    </div>
    <div class="side end">
        <a href={PUBLIC_PKG_HOMEPAGE} target="_blank" rel="noreferrer" title="Github">
            <Button variant="outline" size="2" iconOnly class="p-0">
                <GithubIcon />
            </Button>
        </a>
        <ThemeSelect placement="bottom-end" />
    </div>
</div>

<style lang="scss">
    .container {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-3);

        .side {
            position: relative;
            display: flex;
            align-items: center;
            gap: var(--space-3);

            &.start {
                justify-content: flex-start;
            }

            &.end {
                justify-content: flex-end;
            }
        }
    }
</style>
