<script lang="ts">
    import Panel from '$lib/components/panel/components/panel.svelte';
    import { Button, Dialog, Flex, type DialogProps } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlNumber from '../../controls/ControlNumber.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    let isOpenNested = $state(false);
    let longContent = $state(false);

    const props: DialogProps = $state({
        isOpen: false,
        layout: 'fixed',
        closeOnBackdropClick: true,
        closeOnEscape: true,
        lockScroll: true,
        focusTrap: true,
        blurBackdrop: false,
        keepMounted: false,
        transitionDelay: 0,
        transitionDuration: 250
    });

    const openDialog = () => (props.isOpen = true);
    const closeDialog = () => (props.isOpen = false);

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

<h1>Dialog</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="isOpen" bind:checked={props.isOpen} />
        <ControlSelect label="layout" bind:value={props.layout} options={['fixed', 'scroll', 'fullscreen']} />
        <ControlCheckbox label="closeOnBackdropClick" bind:checked={props.closeOnBackdropClick} />
        <ControlCheckbox label="closeOnEscape" bind:checked={props.closeOnEscape} />
        <ControlCheckbox label="lockScroll" bind:checked={props.lockScroll} />
        <ControlCheckbox label="focusTrap" bind:checked={props.focusTrap} />
        <ControlCheckbox label="blurBackdrop" bind:checked={props.blurBackdrop} />
        <ControlCheckbox label="keepMounted" bind:checked={props.keepMounted} />
        <ControlNumber label="transitionDelay" bind:value={props.transitionDelay} min={0} />
        <ControlNumber label="transitionDuration" bind:value={props.transitionDuration} min={0} />

        <ControlCheckbox label="long content" bind:checked={longContent} />
    {/snippet}

    <Button onclick={openDialog}>Open</Button>

    <Dialog {...props} bind:isOpen={props.isOpen}>
        <Panel
            color="neutral"
            outline
            variant="solid"
            p="5"
            fullWidth={props.layout === 'fullscreen'}
            fullHeight={props.layout === 'fullscreen'}
        >
            <Flex justify="start" direction="column" gap="3">
                <h2>Dialog title</h2>
                {#if longContent}
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse posuere tortor id
                        tellus dapibus, eget consectetur nisl fermentum. In consequat non tellus ac tincidunt.
                        In sodales nunc velit, eu egestas mi luctus vel. Morbi laoreet, metus quis aliquam
                        interdum, arcu nunc malesuada massa, quis fringilla diam lacus nec arcu. Donec
                        accumsan luctus dolor ac pretium. Donec lacinia elit ut eros tincidunt maximus vel
                        fringilla ligula. Duis enim dui, pellentesque quis nulla at, dapibus volutpat diam.
                        Mauris et porta enim. Integer magna augue, dignissim vel congue nec, dignissim vitae
                        turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Nulla porta turpis sapien, non lobortis tellus molestie sed. Sed ut
                        consequat massa, eget pretium nisi. Quisque id lacus lorem. Maecenas hendrerit
                        tincidunt sapien id imperdiet. Nam sagittis efficitur est, a iaculis purus convallis
                        vel. Nunc a ligula ut turpis imperdiet tincidunt. Interdum et malesuada fames ac ante
                        ipsum primis in faucibus. In a eros sed dolor accumsan maximus sit amet in dui.
                        Quisque vel ex metus. Phasellus convallis risus at dui iaculis mollis. Nullam
                        volutpat, justo vitae facilisis euismod, est dolor venenatis eros, non condimentum
                        mauris lectus in leo. Integer nec augue iaculis orci tincidunt tincidunt vitae vitae
                        orci. Aenean posuere fermentum dolor. Sed auctor lobortis sem id vulputate. Morbi
                        posuere sem quis lectus vehicula dictum. Nullam sed orci non erat iaculis elementum.
                        Phasellus eu imperdiet nulla. Aliquam vel lectus consectetur, sodales quam eu,
                        dignissim nunc. Suspendisse semper egestas luctus. In tristique eu neque et feugiat.
                        Nunc nec nibh scelerisque, sagittis massa eu, congue nisi. Ut vel mi cursus, semper
                        erat id, ullamcorper elit. Etiam volutpat fringilla ante, tempus dictum odio posuere
                        eu. Fusce sollicitudin ullamcorper nulla. Nam quis pellentesque erat. Pellentesque
                        quis ligula eget purus finibus posuere fringilla sit amet diam. Mauris non enim eu
                        dolor semper luctus sed eu purus. Curabitur sit amet lobortis neque, at gravida justo.
                        Sed quis eros fermentum, fringilla libero eget, vestibulum risus. Sed id ultrices
                        nulla, a vehicula leo. Donec sed dolor quis turpis mollis finibus ultrices non justo.
                        Nam blandit consectetur ligula non fermentum. Donec blandit tincidunt lacus, sit amet
                        aliquet orci convallis quis. Integer posuere nunc sed nisi vestibulum, sit amet
                        volutpat erat tempus. Morbi non hendrerit risus, et fringilla elit. Morbi ullamcorper,
                        neque vehicula vehicula pretium, nulla risus bibendum ex, et mattis mi metus a tellus.
                        Praesent non nunc lectus. Aenean eu lorem leo. Curabitur ex eros, consequat non urna
                        ut, bibendum malesuada risus. Pellentesque vehicula ante eu dui commodo, in ultricies
                        turpis mollis. Nunc egestas enim quis dolor rutrum, pharetra pharetra nisi
                        consectetur. Fusce nisi urna, molestie nec vulputate id, euismod a felis. Maecenas
                        rutrum venenatis nibh sed feugiat.
                    </p>
                {:else}
                    <p>Dialog paragraph</p>
                {/if}

                <Button onclick={() => (isOpenNested = true)} variant="outline">Info</Button>

                <Flex justify="end" gap="3">
                    <Button onclick={closeDialog} variant="clear">Cancel</Button>
                    <Button onclick={closeDialog}>Confirm</Button>
                </Flex>
            </Flex>
        </Panel>
    </Dialog>

    <Dialog bind:isOpen={isOpenNested}>
        <Panel color="neutral" outline p="5">
            <Flex justify="start" direction="column" gap="3">
                <h2>Nested dialog title</h2>
                <p>Nested dialog paragraph</p>

                <Flex justify="end" gap="3">
                    <Button onclick={() => (isOpenNested = false)}>close</Button>
                </Flex>
            </Flex>
        </Panel>
    </Dialog>
</Playground>

<div><pre>{json}</pre></div>
