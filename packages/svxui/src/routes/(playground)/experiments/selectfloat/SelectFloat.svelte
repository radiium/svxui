<script lang="ts" generics="Value, Multiple extends boolean">
    /* eslint-disable no-console */
    import {
        autoUpdate,
        Button,
        clickoutside,
        Flex,
        flip,
        FloatingEngine,
        Listbox,
        offset,
        Panel
    } from '$lib/index.js';
    import type { SelectFloatProps } from './SelectFloat.types.js';

    let {
        value = $bindable(),
        onValueChange,
        options,
        placeholder,
        multiple = false as Multiple,
        loop = false,
        activateOnFocus = false,
        disabled = false,
        renderValue,
        renderOption,
        renderOptionLabel
    }: SelectFloatProps<Value, Multiple> = $props();

    let isOpen = $state(false);
    let listboxRef: HTMLDivElement | undefined = $state();

    // const open = () => {
    //     isOpen = true;
    //     flushSync();
    //     if (listboxRef?.children) {
    //         (listboxRef?.children.item(0) as HTMLElement)?.focus();
    //     }
    // };
    const close = () => {
        isOpen = false;
    };
    const toggle = () => {
        isOpen = !isOpen;
    };
    // const select = (newValue: SelectionStateValue<Value, Multiple>) => {
    //     value = newValue;
    // };

    const floating = new FloatingEngine({
        strategy: 'fixed',
        transform: true,
        whileElementsMounted: autoUpdate,
        placement: 'bottom-start',
        middleware: [offset(10), flip({ fallbackPlacements: ['top'] })]
    });
</script>

<div class="select-wrapper">
    <Button bind:ref={floating.reference as HTMLButtonElement} onclick={toggle}>
        {#if value !== null && value !== undefined}
            {#if renderValue}
                {@render renderValue?.(value)}
            {:else}
                {value}
            {/if}
        {:else if placeholder}
            {placeholder}
        {:else}
            Select
        {/if}
    </Button>

    {#if isOpen}
        <div
            class="popover"
            style={floating.style}
            data-state={isOpen ? 'open' : 'close'}
            data-side={floating.state?.side}
            data-align={floating.state?.alignment}
            bind:this={floating.floating}
            {@attach clickoutside({
                onClickOutside: close,
                enabled: isOpen, //
                ignoreElements: [floating.reference as HTMLElement]
            })}
        >
            <Listbox
                bind:value
                onValueChange={(newValue) => {
                    console.log('onValueChange', multiple, newValue);
                    onValueChange?.(newValue);
                    if (!multiple) {
                        close();
                    }
                }}
                {multiple}
                {activateOnFocus}
                {loop}
                {disabled}
            >
                {#snippet children(listbox)}
                    <Panel variant="clear" outline p="2">
                        <Flex
                            justify="start"
                            direction="column"
                            gap="1"
                            {...listbox.rootAttrs}
                            bind:ref={listboxRef}
                        >
                            {#each options as opt, i (i)}
                                {@const item = listbox.getItem(opt)}

                                {#if renderOption}
                                    {@render renderOption?.(opt, item)}
                                {:else}
                                    <Button
                                        variant={item.selected ? 'soft' : 'clear'}
                                        active={item.selected}
                                        {...item.attrs}
                                    >
                                        {#if renderOptionLabel}
                                            {@render renderOptionLabel?.(opt)}
                                        {:else}
                                            {opt}
                                        {/if}
                                    </Button>
                                {/if}
                            {/each}
                        </Flex>
                    </Panel>
                {/snippet}
            </Listbox>

            <!-- <Panel variant="soft" outline p="2">
            <Flex justify="start" direction="column">
                {#each options as opt, i (i)}
                    <Button
                        variant={opt === value ? 'solid' : 'clear'}
                        onclick={() => {
                            select(opt);
                            close();
                        }}
                    >
                        {#if renderOption}
                            {@render renderOption?.(opt)}
                        {:else}
                            {opt}
                        {/if}
                    </Button>
                {/each}
            </Flex>
        </Panel> -->
        </div>
    {/if}
</div>

<style>
    .select-wrapper {
        position: relative;
    }

    .popover {
        position: fixed;
        width: max-content;
        top: 0;
        left: 0;
        z-index: 1;

        /* display: flex;
        flex-direction: column;
        background: var(--color-panel-solid);
        box-shadow: inset 0 0 0 1px var(--color-box-shadow);
        padding: var(--space-2); */

        &[data-state='open'] {
            display: flex;
        }

        &[data-state='close'] {
            display: none;
        }
    }
</style>
