<script lang="ts">
    import { Button, Dialog, Flexbox, Sizes1To4, Text } from '$lib/index.js';
    import Details from './Details.svelte';
    import Section from './Section.svelte';
    import Table from './Table.svelte';

    const sizes = Sizes1To4;

    type State = {
        isOpen: boolean;
        fullScreen: boolean;
        noPadding: boolean;
        longContent: boolean;
        size: (typeof Sizes1To4)[number];
    };

    const defaultState: State = {
        isOpen: false,
        fullScreen: false,
        noPadding: false,
        longContent: false,
        size: '3'
    };

    let state: State = { ...defaultState };

    function open(newState = {}) {
        state = {
            ...defaultState,
            ...newState,
            isOpen: true
        };
    }

    function close() {
        state = {
            ...defaultState,
            isOpen: false
        };
    }

    function openSize(size: (typeof Sizes1To4)[number]) {
        open({ size });
    }

    function openFullScreen() {
        open({ fullScreen: true });
    }

    function openNoPadding() {
        open({ noPadding: true });
    }

    function openLongContent() {
        open({ longContent: true });
    }
</script>

<Details>
    <h2 slot="title">Dialog</h2>

    <Dialog
        bind:isOpen={state.isOpen}
        size={state.size}
        fullScreen={state.fullScreen}
        noPadding={state.noPadding}
        maxHeight={state.longContent ? '80vh' : ''}
    >
        <Flexbox direction="column" gap="9" class={state.fullScreen ? 'p-9' : ''}>
            {#if state.longContent}
                <Text>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi enim porta eros natoque molestie
                    dignissim penatibus, natoque dui. Tortor neque proin nascetur in tristique scelerisque
                    platea. Libero ultricies ut vivamus sociosqu lacinia cursus cras tempus auctor. Tempor
                    facilisis morbi morbi hendrerit mauris platea finibus. Condimentum eu vehicula sodales
                    volutpat curae amet dapibus. Vulputate curabitur facilisis sodales; praesent euismod
                    morbi? Aptent mattis dictum elementum augue finibus mi eget orci! Eu quis posuere taciti
                    fusce tristique. Nulla eu ut nec nostra lobortis quam aenean. Condimentum potenti aptent
                    sodales pulvinar rutrum aliquam suspendisse inceptos a? Nulla purus erat class, ultricies
                    egestas sagittis commodo bibendum? Hac elit facilisi phasellus, inceptos turpis torquent.
                    Morbi habitant sollicitudin sapien tortor ultrices tellus pharetra vivamus. Nisi gravida
                    facilisis litora, consequat nulla est feugiat. Convallis turpis metus magnis congue;
                    habitant mus dignissim facilisis. Habitasse dolor natoque purus neque ut condimentum
                    laoreet. Ut consequat lacinia tristique quis lacinia pharetra elementum sociosqu. Vehicula
                    ullamcorper mollis malesuada sit platea. Consectetur eget magnis nulla felis nostra risus
                    luctus. Praesent nostra auctor at vehicula fusce molestie magnis fusce. Platea bibendum
                    aptent quisque enim sagittis nunc posuere. Facilisi condimentum vehicula felis eros
                    natoque mus gravida inceptos. Consectetur diam sagittis lobortis vestibulum ornare
                    imperdiet lobortis. Morbi facilisi gravida, ornare sollicitudin cubilia quam. In tincidunt
                    semper curabitur facilisis elit nulla. Malesuada mollis hac netus etiam tristique
                    pellentesque? Luctus pulvinar velit orci ac hendrerit dictumst. Orci sapien aliquam urna
                    feugiat at. Suspendisse congue est risus quam vulputate metus proin interdum. Maecenas
                    taciti pretium vivamus viverra euismod integer duis netus volutpat. Maximus torquent est
                    tempus id pharetra mauris massa. Magna himenaeos pharetra, lacus magna iaculis ante.
                    Pulvinar cras fringilla libero hendrerit nostra sollicitudin sollicitudin arcu habitant.
                    Vulputate vestibulum litora ligula sapien pellentesque convallis eros. Risus suscipit
                    posuere amet semper porttitor pretium blandit vitae sapien. Posuere class sem nibh etiam,
                    id potenti nulla parturient. Donec pulvinar per congue pharetra maximus luctus nisi ac.
                    Molestie nec massa malesuada tortor consequat at torquent vel. Amet cursus pharetra ipsum
                    ultrices euismod malesuada. Facilisis tortor ultricies rutrum sociosqu eros justo. Per
                    potenti efficitur suscipit torquent cursus; sem ac commodo sollicitudin. Gravida lectus
                    primis egestas vitae euismod mattis imperdiet.
                </Text>
            {:else}
                <Text>Dialog content</Text>
            {/if}
            <Button variant="soft" color="primary" on:click={close}>close</Button>
        </Flexbox>
    </Dialog>

    <Section>
        <h3 slot="title">Size</h3>

        <Table>
            <svelte:fragment slot="head">
                {#each sizes as size}
                    <th>size {size}</th>
                {/each}
            </svelte:fragment>

            <tr>
                {#each sizes as size, i}
                    <td>
                        <Flexbox>
                            <Button variant="soft" color="primary" on:click={() => openSize(size)}>
                                open size {size}
                            </Button>
                        </Flexbox>
                    </td>
                {/each}
            </tr>
        </Table>
    </Section>

    <Section>
        <h3 slot="title">fullScreen</h3>
        <Button variant="soft" color="primary" on:click={openFullScreen}>open fullScreen</Button>
    </Section>

    <Section>
        <h3 slot="title">Long content</h3>
        <Button variant="soft" color="primary" on:click={openLongContent}>open long content</Button>
    </Section>
</Details>
