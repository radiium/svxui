<script lang="ts">
    import CaretUpDownIcon from '$lib/components/icons/CaretUpDownIcon.svelte';
    import { tocState } from '$lib/components/layout/toc/toc-state.svelte';
    import { clickoutside, Text } from 'svxui';
    import TOC from './toc.svelte';

    let open = $state<boolean>(false);
    let summary = $derived(tocState.current?.text || 'On this page');

    const close = () => (open = false);
</script>

<details bind:open {@attach clickoutside({ onClickOutside: close })}>
    <summary>
        <Text as="span">{summary}</Text>
        <CaretUpDownIcon size="1rem" />
    </summary>

    <div class="content">
        <TOC onSelect={close} />
    </div>
</details>

<style>
    details {
        interpolate-size: allow-keywords;
        background-color: var(--color-background-1);

        summary {
            cursor: pointer;
            padding: var(--space-3) var(--space-3);
            height: var(--header-height);
            list-style: none;
            display: flex;
            align-items: center;
            gap: var(--space-1);
        }

        &[open] {
            &::details-content {
                height: auto;
            }
        }

        &::details-content {
            transition:
                height 0.2s,
                content-visibility 0.2s allow-discrete;
            overflow: clip;
            height: 0;
        }

        .content {
            border-top: 1px solid var(--neutral-a5);
            padding: var(--space-3) var(--space-4);
        }
    }
</style>
