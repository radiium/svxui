<script lang="ts">
    type Props = {
        code?: string;
    };

    let { code }: Props = $props();
</script>

<figure>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html code}
    <!-- <pre><code>{@html code}</code></pre> -->
</figure>

<style>
    figure {
        margin: var(--space-4) 0 0 0;
        background-color: var(--color-background-1);
        /* padding: var(--space-3); */
        box-shadow: inset 0 0 0 1px var(--neutral-a5);
        border-radius: var(--radius-4);
        width: 100%;
        overflow: auto;
    }

    :root {
        --sh-class: #2d5e9d;
        --sh-identifier: #8c919b;
        --sh-sign: #9ca3ab;
        --sh-property: #0550ae;
        --sh-entity: #249a97;
        --sh-jsxliterals: #6266d1;
        --sh-string: #00a99a;
        --sh-keyword: #f47067;
        --sh-comment: #a19595;
    }
</style>
