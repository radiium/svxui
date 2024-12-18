<script lang="ts">
    import {
        Button,
        defaultDialogProps,
        Dialog,
        Flexbox,
        Floating,
        Panel,
        Radius,
        RadiusMedium,
        Size3,
        Sizes1To4,
        Text
    } from '$lib/index.js';
    import ControlBoolean from '../playground/ControlBoolean.svelte';
    import ControlSelect from '../playground/ControlSelect.svelte';

    let isOpen = $state(false);

    let size = $state(Size3);
    let radius = $state(RadiusMedium);
    let closeOnBackdropClick = $state(true);
    let closeOnEscape = $state(true);
    let lockScroll = $state(false);
    let fullScreen = $state(false);
    let noPadding = $state(false);
    let transitionDuration = $state(150);
    let width = $state(undefined);
    let minWidth = $state('30rem');
    let maxWidth = $state('60rem');
    let height = $state(undefined);
    let minHeight = $state(undefined);
    let maxHeight = $state(undefined);
</script>

<Dialog
    bind:isOpen
    {size}
    {radius}
    {closeOnBackdropClick}
    {closeOnEscape}
    {lockScroll}
    {fullScreen}
    {noPadding}
    {transitionDuration}
    {width}
    {minWidth}
    {maxWidth}
    {height}
    {minHeight}
    {maxHeight}
>
    <Flexbox direction="column" gap="9" class={fullScreen ? 'p-9' : ''}>
        <Text>Dialog content</Text>
        <Button variant="soft" color="primary" onclick={() => (isOpen = false)}>close</Button>
    </Flexbox>
</Dialog>

<Flexbox direction="column" gap="3" class="p-9">
    <Panel style="overflow: auto;">
        <Flexbox align="center" justify="center">
            <Button variant="soft" onclick={() => (isOpen = true)}>Open</Button>
        </Flexbox>
    </Panel>

    <Panel>
        <Flexbox direction="row" wrap="wrap" align="center" justify="center" gap="7" class="width-100">
            <Flexbox direction="column" gap="2">
                <ControlSelect label="size" bind:value={size} options={[...Sizes1To4]} />
                <ControlSelect label="radius" bind:value={radius} options={[...Radius]} />
            </Flexbox>

            <Flexbox direction="column" gap="2">
                <ControlBoolean label="closeOnBackdropClick" bind:value={closeOnBackdropClick} />
                <ControlBoolean label="closeOnEscape" bind:value={closeOnEscape} />
                <ControlBoolean label="lockScroll" bind:value={lockScroll} />
                <ControlBoolean label="fullScreen" bind:value={fullScreen} />
                <ControlBoolean label="noPadding" bind:value={noPadding} />
            </Flexbox>

            <!-- <Flexbox direction="column" gap="2">
                <ControlBoolean label="closeOnClickBackdrop" bind:value={closeOnClickBackdrop} />
                <ControlBoolean label="closeOnClickOutside" bind:value={closeOnClickOutside} />
                <ControlBoolean label="closeOnEscape" bind:value={closeOnEscape} />
                <ControlBoolean label="closeOnResize" bind:value={closeOnResize} />
                <ControlBoolean label="closeOnScroll" bind:value={closeOnScroll} />
            </Flexbox> -->
        </Flexbox>
    </Panel>
</Flexbox>
