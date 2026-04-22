<script lang="ts">
    import { Button, Flex, Panel, Separator, Text } from 'svxui';
    import { ColorGeneratorState } from './color-generator-state.svelte.js';
    import ColorRow from './ColorRow.svelte';
    import OutputFile from './OutputFile.svelte';
    import CaretDoubleDownIcon from '../icons/CaretDoubleDownIcon.svelte';

    const state = new ColorGeneratorState();
</script>

<Flex justify="start" direction="column" align="center" gap="3" mt="5">
    <!-- Color entries -->
    <Panel as="article" size="0" variant="soft" color="neutral" outline fullWidth>
        <Flex justify="start" direction="column" gap="3">
            <Flex as="header" gap="3" justify="between" align="center" px="3" pt="2">
                <Flex justify="start" direction="column" gap="1">
                    <Text size="3" weight="medium">Define color aliases</Text>
                    <Text size="1" color="neutral">Map an alias name to a Radix palette.</Text>
                </Flex>

                <Button size="2" variant="clear" color="neutral" onclick={state.reset}
                    >Reset to defaults</Button
                >
            </Flex>
            <Separator size="4" />

            <Flex justify="start" direction="column" gap="1" width="100%" px="3" pb="2">
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
            </Flex>
        </Flex>
    </Panel>

    <Flex justify="center" align="center" width="100%">
        <CaretDoubleDownIcon size="2.5rem" />
        <div style="width: 30%"></div>
        <CaretDoubleDownIcon size="2.5rem" />
    </Flex>
    <!-- Generated outputs -->
    {#if state.isValid}
        <Panel color="neutral" variant="soft" outline size="0" fullWidth>
            <OutputFile name="theme.css" codeHtml={state.cssHtml} />
            <Separator size="4" />
            <OutputFile name="svxui-colors.d.ts" codeHtml={state.dtsHtml} />
        </Panel>
    {:else}
        <Panel variant="soft" color="neutral" size="0" outline fullWidth>
            <Flex direction="column" justify="center" align="center" p="3" width="100%">
                {#if state.isEmpty}
                    <Text color="red" size="4">Add at least one color alias to generate the output.</Text>
                {:else}
                    <Text color="red" size="4">Fix the errors above to generate the output.</Text>
                {/if}
            </Flex>
        </Panel>
    {/if}
</Flex>

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
