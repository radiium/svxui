<script lang="ts">
    import { PUBLIC_PKG_HOMEPAGE, PUBLIC_PKG_NAME, PUBLIC_PKG_VERSION } from '$env/static/public';
    import { Badge, Button, Link, Text, ThemeSelect } from 'svxui';
    import GithubIcon from '../icons/GithubIcon.svelte';
</script>

<div class="container pl-3 pr-3">
    <div class="side start">
        <Link
            size="8"
            weight="bold"
            underline="none"
            href="/"
            target="_self"
            rel="noreferrer"
            data-sveltekit-preload-data="tap"
            title={PUBLIC_PKG_NAME}
        >
            {PUBLIC_PKG_NAME}
        </Link>
        <Badge title="Version" class="mt-1">v{PUBLIC_PKG_VERSION}</Badge>
    </div>
    <div class="side end">
        <a href={PUBLIC_PKG_HOMEPAGE} target="_blank" rel="noreferrer" title="Github">
            <Button variant="clear" size="3" iconOnly class="p-0">
                <GithubIcon />
            </Button>
        </a>
        <ThemeSelect size="3" variant="clear" placement="bottom-end" />
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
