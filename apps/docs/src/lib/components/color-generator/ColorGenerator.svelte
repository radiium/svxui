<script lang="ts">
    import { Button, Flexbox, Panel, Separator, Text } from 'svxui';
    import { ColorGeneratorState } from './color-generator-state.svelte.js';
    import ColorRow from './ColorRow.svelte';
    import OutputFile from './OutputFile.svelte';
    import CaretDoubleDownIcon from '../icons/CaretDoubleDownIcon.svelte';

    const state = new ColorGeneratorState();
</script>

<Flexbox direction="column" align="center" gap="3" class="mt-5">
    <!-- Color entries -->
    <Panel as="article" size="0" variant="soft" color="neutral" outline fullWidth>
        <Flexbox direction="column" gap="3">
            <Flexbox as="header" gap="3" justify="between" align="center" class="px-3 pt-2">
                <Flexbox direction="column" gap="1">
                    <Text size="3" weight="medium">Define color aliases</Text>
                    <Text size="1" color="neutral">Map an alias name to a Radix palette.</Text>
                </Flexbox>

                <Button size="2" variant="clear" color="neutral" onclick={state.reset}
                    >Reset to defaults</Button
                >
            </Flexbox>
            <Separator size="4" />

            <Flexbox direction="column" gap="1" fullWidth class="px-3 pb-2">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th style="text-align: left;">Palette</th>
                            <th style="text-align: left;">Alias</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each state.entries as entry (entry.id)}
                            <ColorRow
                                bind:alias={entry.alias}
                                bind:palette={entry.palette}
                                error={state.errors[entry.id]}
                                ondelete={() => state.remove(entry.id)}
                            />
                        {/each}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th colspan="4">
                                <Button
                                    size="2"
                                    variant="soft"
                                    color="neutral"
                                    class="mt-2"
                                    fullWidth
                                    onclick={state.add}
                                >
                                    + Add color
                                </Button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </Flexbox>
        </Flexbox>
    </Panel>

    <Flexbox justify="center" align="center" fullWidth>
        <CaretDoubleDownIcon size="2.5rem" />
        <div style="width: 30%"></div>
        <CaretDoubleDownIcon size="2.5rem" />
    </Flexbox>
    <!-- Generated outputs -->
    {#if state.isValid}
        <Panel color="neutral" variant="soft" outline size="0" fullWidth>
            <OutputFile name="theme.css" codeHtml={state.cssHtml} />
            <Separator size="4" />
            <OutputFile name="svxui-colors.d.ts" codeHtml={state.dtsHtml} />
        </Panel>
    {:else}
        <Panel variant="soft" color="neutral" size="0" outline fullWidth>
            <Flexbox direction="column" justify="center" align="center" class="p-3" fullWidth>
                {#if state.isEmpty}
                    <Text color="red" size="4">Add at least one color alias to generate the output.</Text>
                {:else}
                    <Text color="red" size="4">Fix the errors above to generate the output.</Text>
                {/if}
            </Flexbox>
        </Panel>
    {/if}
</Flexbox>

<style>
    table {
        border-spacing: var(--space-1);
    }

    @media (min-width: 769px) {
        table {
            border-spacing: var(--space-2);
        }
    }
</style>
