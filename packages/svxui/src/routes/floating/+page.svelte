<script lang="ts">
    import Floating from '$lib/components/floating/components/floating.svelte';
    import { Button, Colors, Flexbox, Panel, Placements, VariantsCard } from '$lib/index.js';
    import ControlBoolean from '../playground/ControlBoolean.svelte';
    import ControlNumber from '../playground/ControlNumber.svelte';
    import ControlSelect from '../playground/ControlSelect.svelte';

    let isOpen = $state(false);

    let color = $state(Colors[0]);
    let variant = $state(VariantsCard[0]);
    let placement = $state<(typeof Placements)[number]>('top');
    let offset = $state(7);
    let autoUpdate = $state(true);
    let arrow = $state(true);
    let backdrop = $state(false);
    let closeOnClickBackdrop = $state(false);
    let closeOnClickOutside = $state(true);
    let closeOnEscape = $state(false);
    let closeOnResize = $state(false);
    let closeOnScroll = $state(false);
    let flip = $state(false);
    let shift = $state(false);
    let hide = $state(false);
</script>

<Flexbox direction="column" gap="3" class="p-9">
    <Panel>
        <Flexbox direction="row" wrap="wrap" align="center" justify="center" gap="7" class="width-100">
            <Flexbox direction="column" gap="2">
                <ControlSelect label="color" bind:value={color} options={[...Colors]} />
                <ControlSelect label="color" bind:value={variant} options={[...VariantsCard]} />
                <ControlSelect label="placement" bind:value={placement} options={[...Placements]} />
                <ControlNumber label="offset" bind:value={offset} />
            </Flexbox>

            <Flexbox direction="column" gap="2">
                <ControlBoolean label="autoUpdate" bind:value={autoUpdate} />
                <ControlBoolean label="arrow" bind:value={arrow} />
                <ControlBoolean label="backdrop" bind:value={backdrop} />
                <ControlBoolean label="flip" bind:value={flip} />
                <ControlBoolean label="shift" bind:value={shift} />
                <ControlBoolean label="hide" bind:value={hide} />
            </Flexbox>

            <Flexbox direction="column" gap="2">
                <ControlBoolean label="closeOnClickBackdrop" bind:value={closeOnClickBackdrop} />
                <ControlBoolean label="closeOnClickOutside" bind:value={closeOnClickOutside} />
                <ControlBoolean label="closeOnEscape" bind:value={closeOnEscape} />
                <ControlBoolean label="closeOnResize" bind:value={closeOnResize} />
                <ControlBoolean label="closeOnScroll" bind:value={closeOnScroll} />
            </Flexbox>
        </Flexbox>
    </Panel>

    <Panel style="overflow: auto;">
        <Flexbox direction="column" align="center" gap="2">
            <Floating
                bind:isOpen
                {color}
                {variant}
                {placement}
                {offset}
                {autoUpdate}
                {arrow}
                {backdrop}
                {closeOnClickBackdrop}
                {closeOnClickOutside}
                {closeOnEscape}
                {closeOnResize}
                {closeOnScroll}
                {flip}
                {shift}
                {hide}
            >
                {#snippet trigger()}
                    <Button
                        variant="soft"
                        onclick={() => {
                            isOpen = true;
                        }}
                    >
                        Open
                    </Button>
                {/snippet}
                {#snippet content()}
                    <div>Floating content</div>
                    <!-- <Panel variant="soft" color="primary" size="9">Floating content</Panel> -->
                {/snippet}
            </Floating>
        </Flexbox>
    </Panel>
</Flexbox>
