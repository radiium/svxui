<script lang="ts">
    import { Button, Flexbox, Floating, Placements, Sizes0To5 } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes0To5;
    const placements = Placements;

    let isOpenPlacement = $state(placements.map(() => false));
    let isOpenSize = $state(sizes.map(() => false));
    let isOpenArrow = $state(false);
    let isOpenOutline = $state(false);
    let isOpenArrowOutline = $state(false);
    let isOpenBackdrop = $state(false);
    let isOpenHover = $state(false);
    let isOpenOutside = $state(false);

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

        <Table>
            {#each placements as placement, i}
                <tr>
                    <td>{placement}</td>
                    <td>
                        <Flexbox>
                            <Floating
                                {placement}
                                bind:isOpen={isOpenPlacement[i]}
                                closeOnClickOutside
                                closeOnClickBackdrop
                                closeOnEscape
                                closeOnResize
                                closeOnScroll
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
            <h3>Arrow</h3>
        {/snippet}

        <Floating
            bind:isOpen={isOpenArrow}
            arrow
            offset={10}
            closeOnClickOutside
            closeOnClickBackdrop
            closeOnEscape
            closeOnResize
            closeOnScroll
            portal
            portalTarget="#portal-container"
        >
            {#snippet trigger()}
                <Button variant="soft" onclick={() => (isOpenArrow = true)}>Open with arrow</Button>
            {/snippet}
            {#snippet content()}
                <div>Floating content</div>
            {/snippet}
        </Floating>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Outline</h3>
        {/snippet}

        <Floating
            bind:isOpen={isOpenOutline}
            outline
            closeOnClickOutside
            closeOnClickBackdrop
            closeOnEscape
            closeOnResize
            closeOnScroll
            portal
            portalTarget="#portal-container"
        >
            {#snippet trigger()}
                <Button variant="soft" onclick={() => (isOpenOutline = true)}>Open with outline</Button>
            {/snippet}
            {#snippet content()}
                <div>Floating content</div>
            {/snippet}
        </Floating>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Arrow + Outline</h3>
        {/snippet}

        <Floating
            bind:isOpen={isOpenArrowOutline}
            arrow
            offset={10}
            outline
            closeOnClickOutside
            closeOnClickBackdrop
            closeOnEscape
            closeOnResize
            closeOnScroll
            portal
            portalTarget="#portal-container"
        >
            {#snippet trigger()}
                <Button variant="soft" onclick={() => (isOpenArrowOutline = true)}>Open with outline</Button>
            {/snippet}
            {#snippet content()}
                <div>Floating content</div>
            {/snippet}
        </Floating>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Backdrop</h3>
        {/snippet}

        <Floating
            bind:isOpen={isOpenBackdrop}
            backdrop
            closeOnClickOutside
            closeOnClickBackdrop
            closeOnEscape
            closeOnResize
            closeOnScroll
            portal
            portalTarget="#portal-container"
        >
            {#snippet trigger()}
                <Button variant="soft" onclick={() => (isOpenBackdrop = true)}>Open with backdrop</Button>
            {/snippet}
            {#snippet content()}
                <div>Floating content</div>
            {/snippet}
        </Floating>
    </Section>

    <Section>
        {#snippet title()}
            <h3>Hover</h3>
        {/snippet}

        <Floating
            bind:isOpen={isOpenHover}
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

    <Section>
        {#snippet title()}
            <h3>Close click outside</h3>
        {/snippet}

        <Floating bind:isOpen={isOpenOutside} closeOnClickOutside portal portalTarget="#portal-container">
            {#snippet trigger()}
                <Button
                    variant="soft"
                    onclick={(event) => {
                        event.preventDefault();
                        isOpenOutside = !isOpenOutside;
                    }}
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
