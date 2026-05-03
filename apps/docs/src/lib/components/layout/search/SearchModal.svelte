<script lang="ts">
    import { goto } from '$app/navigation';
    import { getSearchEntries, type SearchEntry } from '$lib/content-utils/search-data';
    import { Document } from 'flexsearch';
    import { onMount, tick, untrack } from 'svelte';
    import { Dialog, Flex, Panel, Separator, Text } from 'svxui';
    import SearchIcon from '../../icons/SearchIcon.svelte';

    interface Props {
        isOpen?: boolean;
        onClose?: () => void;
    }

    let { isOpen = $bindable(), onClose }: Props = $props();

    let index: Document<SearchEntry>;
    let query = $state('');
    let results = $state<SearchEntry[]>([]);
    let current = $state<number>(-1);
    let inputEl: HTMLInputElement | undefined = $state(undefined);
    let resultsEl: HTMLDivElement | undefined = $state(undefined);

    onMount(async () => {
        await tick();
        inputEl?.focus();

        index = new Document<SearchEntry>({
            document: {
                id: 'url',
                index: ['title', 'description'],
                store: true
            },
            tokenize: 'forward'
        });

        for (const entry of getSearchEntries()) {
            index.add(entry);
        }
    });

    $effect(() => {
        const q = query.trim();
        if (!q || !index) {
            results = [];
            current = -1;
            return;
        }

        const raw = index.search({
            query: q,
            limit: 8,
            suggest: true,
            enrich: true,
            merge: true
        });

        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const seen = new Set<string>();
        const deduped: SearchEntry[] = [];

        for (const item of raw) {
            if (!seen.has(item.id as string)) {
                seen.add(item.id as string);
                if (item.doc) {
                    deduped.push(item.doc);
                }
            }
        }

        untrack(() => {
            const curr = results[current];
            const next = deduped[current];
            if (!curr || !next || curr.url !== next.url) {
                current = deduped.length ? 0 : -1;
            }
        });

        results = deduped;
    });

    const closeAndReset = () => {
        onClose?.();
        query = '';
    };

    const onKeydown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'Escape': {
                closeAndReset();
                break;
            }

            case 'Enter': {
                const curr = results[current];
                if (curr) {
                    closeAndReset();
                    // eslint-disable-next-line svelte/no-navigation-without-resolve
                    goto(curr.url);
                }
                break;
            }

            case 'ArrowUp': {
                if (results.length) {
                    let next = current - 1;
                    if (next < 0) {
                        next = results.length - 1;
                    }
                    current = next;
                    tryScrollIntoView(current, resultsEl);
                }
                break;
            }

            case 'ArrowDown': {
                if (results.length) {
                    let next = current + 1;
                    if (next >= results.length) {
                        next = 0;
                    }
                    current = next;
                    tryScrollIntoView(current, resultsEl);
                }
                break;
            }

            default:
                break;
        }
    };

    const tryScrollIntoView = (idx: number, container?: HTMLDivElement) => {
        container
            ?.querySelectorAll('a.result-item')
            ?.item(idx)
            .scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };
</script>

<svelte:window onkeydown={onKeydown} />

<Dialog bind:isOpen layout="fixed" style="margin-top: 20%">
    <Panel variant="surface" outline p="0" fullWidth>
        <Flex direction="column" width="500px" maxWidth="90vw" maxHeight="60vh" class="overflow-hidden">
            <Flex align="center" gap="2" px="3" py="2">
                <SearchIcon size="18px" />
                <input bind:this={inputEl} bind:value={query} class="search-input" placeholder="Search" />
                <kbd>Esc</kbd>
            </Flex>

            {#if query.trim()}
                <Separator size="4" />
                {#if results.length > 0}
                    <div class="results" bind:this={resultsEl}>
                        {#each results as result, i (result.url)}
                            <a
                                href={result.url}
                                onclick={closeAndReset}
                                class="result-item"
                                class:active={current === i}
                            >
                                <Text weight="medium" size="4">{result.title}</Text>
                                {#if result.description}
                                    <Text size="2" muted>{result.description}</Text>
                                {/if}
                            </a>
                        {/each}
                    </div>
                {:else}
                    <Flex py="6" justify="center" class="overflow-auto">
                        <Text muted>No results for "{query}"</Text>
                    </Flex>
                {/if}
            {/if}
        </Flex>
    </Panel>
</Dialog>

<style>
    .search-input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        font-size: var(--font-size-4);
        color: var(--color);
        padding: var(--space-1) 0;

        &::placeholder {
            color: var(--neutral-a8);
        }
    }

    kbd {
        font-size: var(--font-size-1);
        padding: 2px 6px;
        border-radius: var(--radius-1);
        background: var(--neutral-a3);
        color: var(--neutral-a11);
        border: 1px solid var(--neutral-a6);
        white-space: nowrap;
        flex-shrink: 0;
    }

    .results {
        overflow-y: auto;
        padding: var(--space-2);
        display: flex;
        flex-direction: column;
        gap: 2px;

        .result-item {
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
            padding: var(--space-3);
            border-radius: var(--radius-3);
            text-decoration: none;
            color: inherit;
            transition: background 0.1s;

            &:hover,
            &.active {
                background: var(--neutral-a3);
            }

            &:focus-visible {
                outline: 2px solid var(--accent-8);
                outline-offset: -2px;
            }
        }
    }
</style>
