<script lang="ts">
    import { Button, Colors, Flexbox, Floating, Placements, Sizes0To5, VariantsCard } from '$lib/index.js';
    import ControlBoolean from './ControlBoolean.svelte';
    import ControlNumber from './ControlNumber.svelte';
    import ControlSelect from './ControlSelect.svelte';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes0To5;
    const placements = Placements;

    let color = $state(Colors[0]);
    let variant = $state(VariantsCard[0]);
    let offset = $state(7);
    let autoUpdate = $state(true);
    let arrow = $state(false);
    let outline = $state(false);
    let backdrop = $state(false);
    let closeOnClickBackdrop = $state(false);
    let closeOnClickOutside = $state(true);
    let closeOnEscape = $state(false);
    let closeOnResize = $state(false);
    let closeOnScroll = $state(false);
    let flip = $state(false);
    let shift = $state(false);
    let hide = $state(false);

    let isOpenPlacement = $state(placements.map(() => false));

    let isOpenSize = $state(sizes.map(() => false));
    let isOpenHover = $state(false);

    let hoverTimeout: ReturnType<typeof setTimeout>;
    function handleHoverOpen() {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => (isOpenHover = true), 800);
    }
    function handleHoverClose() {
        clearTimeout(hoverTimeout);
        isOpenHover = false;
    }
</script>

<Details>
    {#snippet title()}
        <h2>Floating</h2>
    {/snippet}

    <div id="portal-container"></div>

    <Section>
        {#snippet title()}
            <h3>Placement</h3>
        {/snippet}

        <Flexbox direction="column" gap="2" class="mb-5">
            <ControlSelect label="color" bind:value={color} options={[...Colors]} />
            <ControlSelect label="color" bind:value={variant} options={[...VariantsCard]} />
            <ControlNumber label="offset" bind:value={offset} />
            <ControlBoolean label="autoUpdate" bind:value={autoUpdate} />
            <ControlBoolean label="arrow" bind:value={arrow} />
            <ControlBoolean label="outline" bind:value={outline} />
            <ControlBoolean label="backdrop" bind:value={backdrop} />
            <ControlBoolean label="closeOnClickBackdrop" bind:value={closeOnClickBackdrop} />
            <ControlBoolean label="closeOnClickOutside" bind:value={closeOnClickOutside} />
            <ControlBoolean label="closeOnEscape" bind:value={closeOnEscape} />
            <ControlBoolean label="closeOnResize" bind:value={closeOnResize} />
            <ControlBoolean label="closeOnScroll" bind:value={closeOnScroll} />
            <ControlBoolean label="flip" bind:value={flip} />
            <ControlBoolean label="shift" bind:value={shift} />
            <ControlBoolean label="hide" bind:value={hide} />
        </Flexbox>

        <Table>
            {#each placements as placement, i}
                <tr>
                    <td>{placement}</td>
                    <td>
                        <Flexbox>
                            <Floating
                                {color}
                                {variant}
                                {offset}
                                {autoUpdate}
                                {outline}
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
                                {placement}
                                bind:isOpen={isOpenPlacement[i]}
                                portal
                                portalTarget="#portal-container"
                            >
                                {#snippet trigger()}
                                    <Button
                                        variant="soft"
                                        onclick={() => {
                                            isOpenPlacement[i] = true;
                                        }}
                                    >
                                        Open {placement}
                                    </Button>
                                {/snippet}
                                {#snippet content()}
                                    <div>Floating content</div>
                                {/snippet}
                            </Floating>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Size</h3>
        {/snippet}

        <Table>
            {#each sizes as size, i}
                <tr>
                    <td>size {size}</td>
                    <td>
                        <Flexbox>
                            <Floating
                                {size}
                                bind:isOpen={isOpenSize[i]}
                                closeOnClickOutside
                                closeOnClickBackdrop
                                closeOnEscape
                                closeOnResize
                                closeOnScroll
                                portal
                                portalTarget="#portal-container"
                            >
                                {#snippet trigger()}
                                    <Button variant="soft" onclick={() => (isOpenSize[i] = true)}>
                                        Open size {size}
                                    </Button>
                                {/snippet}
                                {#snippet content()}
                                    <div>Floating content</div>
                                {/snippet}
                            </Floating>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Hover</h3>
        {/snippet}

        <Floating
            bind:isOpen={isOpenHover}
            outline
            arrow
            offset={10}
            closeOnEscape
            closeOnResize
            closeOnScroll
            portal
            portalTarget="#portal-container"
        >
            {#snippet trigger()}
                <Button
                    variant="soft"
                    onfocus={handleHoverOpen}
                    onpointerenter={handleHoverOpen}
                    onblur={handleHoverClose}
                    onpointerleave={handleHoverClose}
                >
                    Open on hover with 800ms delay
                </Button>
            {/snippet}
            {#snippet content()}
                <div>Floating content</div>
            {/snippet}
        </Floating>
    </Section>
</Details>
