<script lang="ts">
    import FloatingArrow from '$lib/components/floating/components/floating-arrow.svelte';
    import Input from '$lib/components/input/components/input.svelte';
    import { Button, Flex, FloatingBuilder, Panel } from '$lib/index.js';
    import { arrow, autoUpdate, offset, size, type Middleware } from '@floating-ui/dom';
    import { fade } from 'svelte/transition';

    let open = $state(false);
    let arrowEl: SVGSVGElement | undefined = $state(undefined);

    const floating = new FloatingBuilder({
        get open() {
            return open;
        },
        set open(newOpen: boolean) {
            open = newOpen;
        },
        engineOptions: {
            placement: 'top',
            strategy: 'absolute',
            whileElementsMounted: autoUpdate,
            get middleware(): Array<Middleware | undefined | null | false> {
                return [
                    offset(30), //,
                    size({
                        apply: ({ rects, elements }) => {
                            Object.assign(elements.floating?.style ?? {}, {
                                width: `${rects.reference.width}px`,
                                minWidth: `${rects.reference.width}px`
                            });
                        }
                    }),
                    arrowEl ? arrow({ padding: 20, element: arrowEl }) : undefined
                ];
            }
        },
        focusOnOpen: '[data-focusopen]',
        focusOnClose: '[data-focusclose]',
        focusTrap: true,
        closeOnBackdropClick: false,
        closeOnOutsideClick: false,
        closeOnEscape: false,
        closeOnResize: false,
        closeOnScroll: false
    });
</script>

<Panel variant="clear" outline fullWidth>
    <Flex justify="start" direction="column" gap="3">
        <h2>Floating Manager</h2>
        <Input data-focusclose />
        <Button {...floating.triggerAttrs} onclick={floating.toggle}>open ({open})</Button>

        {#if open}
            <div
                class="backdrop"
                {...floating.backdropAttrs}
                transition:fade={{ duration: 150, delay: 0 }}
            ></div>

            <div class="floating" {...floating.contentAttrs} transition:fade={{ duration: 150, delay: 0 }}>
                <Panel>
                    <Flex justify="start" direction="column" gap="5">
                        <h3 style="margin: 0">Hello popover</h3>
                        <div>
                            <Input placeholder="What's your first name?" />
                            <Input placeholder="What's your last name?" data-focusopen />
                        </div>

                        <Flex justify="end" gap="3">
                            <Button variant="outline" onclick={floating.closeFloating}>Cancel</Button>
                            <Button onclick={floating.closeFloating}>Confirm</Button>
                        </Flex>
                    </Flex>

                    <FloatingArrow
                        bind:ref={arrowEl}
                        floatingState={floating.state}
                        height={120}
                        width={30}
                        tipRadius={10}
                    />
                </Panel>

                <!-- <div class="arrow" {...floating.arrowAttrs}></div> -->
            </div>
        {/if}
    </Flex>
</Panel>

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        height: 100vh;
        width: 100vw;
        pointer-events: none;
        z-index: 0;
        backdrop-filter: blur(2px);
    }
    .floating {
        position: fixed;
        width: max-content;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .arrow {
        width: 16px;
        height: 16px;
        background-color: red;
    }
</style>
