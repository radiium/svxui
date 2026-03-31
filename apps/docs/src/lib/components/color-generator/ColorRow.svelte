<script lang="ts">
    import XIcon from '$lib/components/icons/XIcon.svelte';
    import { Button, Input, Select, SelectOption, Text } from 'svxui';
    import { RADIX_PALETTES, type RadixPalette } from './radix-palettes.js';

    type Props = {
        alias: string;
        palette: RadixPalette;
        error?: string;
        ondelete: () => void;
    };

    let { alias = $bindable(), palette = $bindable(), error = '', ondelete }: Props = $props();

    let swatch = $derived(`var(--${palette}-9)`);
</script>

<tr>
    <td class="swatch">
        <div style:background-color={swatch}></div>
    </td>
    <td class="palette" data-label="Palette">
        <Select bind:value={palette} fullWidth>
            {#each RADIX_PALETTES as p (p)}
                <SelectOption value={p}>{p}</SelectOption>
            {/each}
        </Select>
    </td>
    <td class="alias" data-label="Alias">
        <Input bind:value={alias} placeholder="alias" size="2" color={error ? 'red' : undefined} fullWidth />
    </td>
    <td class="action">
        <Button size="2" variant="clear" color="red" iconOnly onclick={ondelete} title="Remove">
            <XIcon size="16" />
        </Button>
    </td>
</tr>

{#if error}
    <tr>
        <td></td>
        <td></td>
        <td>
            <Text size="1" color="red" as="div">{error}</Text>
        </td>
        <td></td>
    </tr>
{/if}

<style>
    tr {
        td {
            margin: 0;
            padding: 0;
            border: none;

            &.swatch {
                width: var(--space-4);

                div {
                    flex-shrink: 0;
                    width: var(--space-4);
                    height: var(--space-4);
                    border-radius: 50%;
                    border: 1px solid var(--accent-6);
                }
            }
            &.alias {
                max-width: 130px;
            }
            &.action {
                width: var(--space-6);
            }
        }
    }

    @media (min-width: 769px) {
        tr {
            td {
                &.swatch {
                    width: var(--space-6);

                    div {
                        width: var(--space-6);
                        height: var(--space-6);
                    }
                }
            }
        }
    }
</style>
