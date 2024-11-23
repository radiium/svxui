<script lang="ts">
    import { SchemaPropType, type SchemaProp } from '$lib/doc.types.js';
    import Minus from 'phosphor-svelte/lib/Minus';
    import { Card, Flexbox, Text } from 'svxui';
    import TablePopover from './TablePopover.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLDivElement> & {
        props?: SchemaProp[];
    };

    let { props = [], ...rest }: Props = $props();

    function resolveTypeValue(prop: SchemaProp): string | undefined {
        switch (prop.type) {
            case SchemaPropType.htmlElement:
                return prop.typeHtmlElement;
            case SchemaPropType.asElement:
                return prop.typeAsElement;
            case SchemaPropType.custom:
                return prop.typeCustom;
            default:
                return prop.type;
        }
    }
</script>

{#if Array.isArray(props) && props}
    <Card size="0" variant="surface" class={rest.class}>
        <div class="table-wrapper">
            <table class="api-reference-table">
                <thead class="rt-TableHeader">
                    <tr class="rt-TableRow">
                        <th scope="col" style="width: auto;">Prop name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Default value</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {#each props as prop}
                        <tr>
                            <td data-color="primary">
                                <code class="name">{prop.name}</code>
                            </td>
                            <td data-color="gray">
                                <Flexbox display="inline-flex" align="center" justify="start" gap="1">
                                    <div>
                                        <code>{resolveTypeValue(prop)}</code>
                                    </div>
                                    {#if prop.values}
                                        <TablePopover>
                                            <div class="p-3">
                                                <Text color="gray">
                                                    <code>
                                                        {prop.values.map((v) => `"${v}"`).join(' | ')}
                                                    </code>
                                                </Text>
                                            </div>
                                        </TablePopover>
                                    {/if}
                                </Flexbox>
                            </td>
                            <td data-color="gray">
                                {#if prop.default !== undefined}
                                    <code class="default">
                                        {prop.default}
                                    </code>
                                {:else}
                                    <Minus color="var(--accent-a11)" size="15" />
                                {/if}
                            </td>
                            <td data-color="gray">
                                {#if prop.description}
                                    <code class="default">
                                        {prop.description}
                                    </code>
                                {:else}
                                    <Minus color="var(--accent-a11)" size="15" />
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </Card>
{/if}
