<script lang="ts">
    import { Button, Flexbox, Floating, Placements, Sizes0To5 } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes0To5;
    const placements = Placements;

    let isOpenPlacement = placements.map(() => false);
    let isOpenSize = sizes.map(() => false);
    let isOpenArrow = false;
    let isOpenOutline = false;
    let isOpenArrowOutline = false;
    let isOpenBackdrop = false;
</script>

<Details>
    <h2 slot="title">Floating</h2>

    <Section>
        <h3 slot="title">Placement</h3>

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
                            >
                                <Button
                                    slot="trigger"
                                    variant="soft"
                                    on:click={() => (isOpenPlacement[i] = true)}>Open {placement}</Button
                                >
                                <div slot="content">Floating content</div>
                            </Floating>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Size</h3>

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
                            >
                                <Button slot="trigger" variant="soft" on:click={() => (isOpenSize[i] = true)}
                                    >Open size {size}</Button
                                >
                                <div slot="content">Floating content</div>
                            </Floating>
                        </Flexbox>
                    </td>
                </tr>
            {/each}
        </Table>
    </Section>

    <Section>
        <h3 slot="title">Arrow</h3>

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
        >
            <Button slot="trigger" variant="soft" on:click={() => (isOpenArrow = true)}
                >Open with arrow</Button
            >
            <div slot="content">Floating content</div>
        </Floating>
    </Section>

    <Section>
        <h3 slot="title">Outline</h3>

        <Floating
            bind:isOpen={isOpenOutline}
            outline
            closeOnClickOutside
            closeOnClickBackdrop
            closeOnEscape
            closeOnResize
            closeOnScroll
            portal
        >
            <Button slot="trigger" variant="soft" on:click={() => (isOpenOutline = true)}
                >Open with outline</Button
            >
            <div slot="content">Floating content</div>
        </Floating>
    </Section>

    <Section>
        <h3 slot="title">Arrow + Outline</h3>

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
        >
            <Button slot="trigger" variant="soft" on:click={() => (isOpenArrowOutline = true)}
                >Open with outline</Button
            >
            <div slot="content">Floating content</div>
        </Floating>
    </Section>

    <Section>
        <h3 slot="title">Backdrop</h3>

        <Floating
            bind:isOpen={isOpenBackdrop}
            backdrop
            closeOnClickOutside
            closeOnClickBackdrop
            closeOnEscape
            closeOnResize
            closeOnScroll
            portal
        >
            <Button slot="trigger" variant="soft" on:click={() => (isOpenBackdrop = true)}
                >Open with backdrop</Button
            >
            <div slot="content">Floating content</div>
        </Floating>
    </Section>
</Details>
