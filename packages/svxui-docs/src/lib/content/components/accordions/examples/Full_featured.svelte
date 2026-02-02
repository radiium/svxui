<script lang="ts">
    import { slide } from 'svelte/transition';
    import { Accordions, Button, Flexbox, Panel, Text } from 'svxui';

    let selection: string[] = $state([]);
    const items = [
        {
            id: '1',
            title: 'Title 1',
            content: 'Content 1'
        },
        {
            id: '2',
            title: 'Title 2',
            content: 'Content 2'
        },
        {
            id: '3',
            title: 'Title 3',
            content: 'Content 3'
        },
        {
            id: '4',
            title: 'Title 4',
            content: 'Content 4',
            disabled: true
        }
    ];
    const ids = items.map(({ id }) => id);

    function toggleFirst(): void {
        if (selection.includes('1')) {
            selection = selection.filter((id) => id !== '1');
        } else {
            selection = [...selection, '1'];
        }
    }

    function openAll(): void {
        selection = [...ids];
    }

    function closeAll(): void {
        selection = [];
    }
</script>

<Flexbox direction="column" gap="6">
    <Flexbox justify="center" gap="3">
        <Button onclick={toggleFirst}>Toggle first</Button>
        <Button onclick={openAll}>Open all</Button>
        <Button onclick={closeAll}>Close all</Button>
    </Flexbox>

    <Accordions bind:value={selection} multiple orientation="vertical">
        {#snippet children(accordions)}
            <Flexbox direction="column" gap="3" {...accordions.rootAttrs} style="width: 300px;">
                {#each items as data (data.id)}
                    <!-- Item -->
                    {@const item = accordions.getItem(data.id, { id: data.id, disabled: data.disabled })}
                    <Panel variant="soft" size="0">
                        <Flexbox direction="column" {...item.itemAttrs}>
                            <!-- Heading -->
                            <Flexbox
                                justify="between"
                                align="center"
                                class="px-4 py-3"
                                {...item.headingAttrs}
                            >
                                <Text disabled={item.disabled}>{data.title}</Text>
                                <!-- Trigger -->
                                <Button
                                    size="2"
                                    radius="full"
                                    iconOnly
                                    variant="outline"
                                    {...item.triggerAttrs}
                                >
                                    {#if item.expanded}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 256 256"
                                            width="20"
                                            height="20"
                                        >
                                            <rect width="256" height="256" fill="none" />
                                            <polyline
                                                points="208 96 128 176 48 96"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="16"
                                            />
                                        </svg>
                                    {:else}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 256 256"
                                            width="20"
                                            height="20"
                                        >
                                            <rect width="256" height="256" fill="none" />
                                            <polyline
                                                points="96 48 176 128 96 208"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="16"
                                            />
                                        </svg>
                                    {/if}
                                </Button>
                            </Flexbox>

                            <!-- Content -->
                            {#if item.expanded}
                                <div transition:slide={{ duration: 150 }} class="p-4" {...item.contentAttrs}>
                                    {data.content}
                                </div>
                            {/if}
                        </Flexbox>
                    </Panel>
                {/each}
            </Flexbox>
        {/snippet}
    </Accordions>
</Flexbox>
