<script lang="ts">
    import { Button, Flex, Panel, Separator, Text } from 'svxui';
    import { ColorGeneratorState } from './color-generator-state.svelte.js';
    import ColorRow from './ColorRow.svelte';
    import OutputFile from './OutputFile.svelte';

    const state = new ColorGeneratorState();
</script>

<Flex justify="start" direction="column" align="center" gap="5" class="mt-5">
    <!-- Color entries -->
    <Panel as="article" p="0" variant="soft" color="neutral" outline fullWidth>
        <Flex justify="start" direction="column" gap="3">
            <!-- Header -->
            <Flex as="header" gap="3" justify="between" align="center" class="px-3 pt-2">
                <Flex justify="start" direction="column" gap="1">
                    <Text size="3" weight="medium">Define color aliases</Text>
                    <Text size="1" color="neutral">Map an alias name to a Radix palette.</Text>
                </Flex>

                <Button size="2" variant="clear" color="neutral" onclick={state.reset}>
                    Reset to defaults
                </Button>
            </Flex>
            <Separator size="4" />

            <!-- Colors -->
            <Flex justify="start" direction="column" gap="1" class="w-full px-3 pb-2">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Palette</th>
                            <th>Alias</th>
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

    {#if state.isValid}
        <!-- Generated outputs -->
        <Panel color="neutral" variant="soft" outline p="0" fullWidth>
            <OutputFile name="theme.css" codeHtml={state.cssHtml} />
            <Separator size="4" />
            <OutputFile name="svxui-colors.d.ts" codeHtml={state.dtsHtml} />
        </Panel>
    {:else}
        <!-- Errors messages -->
        <Panel variant="soft" color="neutral" p="0" outline fullWidth>
            <Flex direction="column" justify="center" align="center" class="w-full p-3">
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

        thead {
            tr {
                th {
                    text-align: left;
                }
            }
        }
    }

    @media (min-width: 769px) {
        table {
            border-spacing: var(--space-2);
        }
    }
</style>
