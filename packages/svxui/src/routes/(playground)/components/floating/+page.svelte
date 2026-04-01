<script lang="ts">
    import { AllRadixColors, Button, Flexbox, Floating, Input, type FloatingProps } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlInput from '../../controls/ControlInput.svelte';
    import ControlNumber from '../../controls/ControlNumber.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    let isOpenNested = $state(false);

    const props: FloatingProps = $state({
        isOpen: false,
        placement: 'bottom',
        color: 'neutral',
        variant: 'solid',
        size: '3',
        backdrop: false,
        autoUpdate: false,
        outline: false,
        portal: false,
        arrow: false,
        flip: false,
        shift: false,
        hide: false,
        focusTrap: false,
        offset: 0,
        arrowHeight: 12,
        arrowWidth: 16,
        arrowTipRadius: undefined,
        closeOnOutsideClick: true,
        closeOnBackdropClick: true,
        closeOnEscape: true,
        closeOnResize: false,
        closeOnScroll: false,
        transitionDelay: 0,
        transitionDuration: 150,
        focusOnOpen: '[data-floating-input]',
        focusOnClose: undefined
    });

    let json = $derived(
        JSON.stringify(
            {
                isOpenNested,
                props
            },
            null,
            2
        )
    );
</script>

<h1>Floating</h1>

<Playground>
    {#snippet controls()}
        <ControlSelect
            label="placement"
            bind:value={props.placement}
            options={[
                'top',
                'right',
                'bottom',
                'left',
                'top-start',
                'top-end',
                'right-start',
                'right-end',
                'bottom-start',
                'bottom-end',
                'left-start',
                'left-end'
            ]}
        />
        <ControlSelect
            label="variant"
            bind:value={props.variant}
            options={['solid', 'soft', 'surface', 'clear']}
        />
        <ControlSelect label="color" bind:value={props.color} options={AllRadixColors} />
        <ControlSelect label="size" bind:value={props.size} options={['1', '2', '3', '4', '5']} />
        <ControlCheckbox label="autoUpdate" bind:checked={props.autoUpdate} />
        <ControlCheckbox label="focusTrap" bind:checked={props.focusTrap} />
        <ControlCheckbox label="outline" bind:checked={props.outline} />
        <ControlCheckbox label="backdrop" bind:checked={props.backdrop} />
        <ControlCheckbox label="flip" bind:checked={props.flip} />
        <ControlCheckbox label="shift" bind:checked={props.shift} />
        <ControlCheckbox label="hide" bind:checked={props.hide} />
        <ControlCheckbox label="portal" bind:checked={props.portal} />
        <ControlCheckbox label="arrow" bind:checked={props.arrow} />
        <ControlNumber label="arrowWidth" bind:value={props.arrowWidth} />
        <ControlNumber label="arrowHeight" bind:value={props.arrowHeight} />
        <ControlNumber label="arrowTipRadius" bind:value={props.arrowTipRadius} />
        <ControlNumber label="offset" bind:value={props.offset} />
        <ControlCheckbox label="closeOnOutsideClick" bind:checked={props.closeOnOutsideClick} />
        <ControlCheckbox label="closeOnBackdropClick" bind:checked={props.closeOnBackdropClick} />
        <ControlCheckbox label="closeOnEscape" bind:checked={props.closeOnEscape} />
        <ControlCheckbox label="closeOnResize" bind:checked={props.closeOnResize} />
        <ControlCheckbox label="closeOnScroll" bind:checked={props.closeOnScroll} />
        <ControlNumber label="transitionDelay" bind:value={props.transitionDelay} />
        <ControlNumber label="transitionDuration" bind:value={props.transitionDuration} />
        <ControlInput label="focusOnOpen" bind:value={props.focusOnOpen} />
        <ControlInput label="focusOnClose" bind:value={props.focusOnClose} />
    {/snippet}

    <Floating {...props} bind:isOpen={props.isOpen}>
        {#snippet trigger()}
            <Button variant="soft" onclick={() => (props.isOpen = !props.isOpen)}>click me</Button>
        {/snippet}

        {#snippet content()}
            <Flexbox direction="column" align="center" gap="3" style="width: 300px;">
                Sample floating element

                <Input data-floating-input />

                <Floating
                    bind:isOpen={isOpenNested}
                    placement="top"
                    closeOnOutsideClick
                    closeOnEscape
                    autoUpdate
                    arrow
                    variant="solid"
                    color="green"
                >
                    {#snippet trigger()}
                        <Button
                            variant="soft"
                            onmouseenter={() => (isOpenNested = true)}
                            onmouseout={() => (isOpenNested = false)}
                        >
                            Hover me
                        </Button>
                    {/snippet}

                    {#snippet content()}
                        Nested floating element
                    {/snippet}
                </Floating>
            </Flexbox>
        {/snippet}
    </Floating>
</Playground>

<div><pre>{json}</pre></div>
