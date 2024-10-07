<script lang="ts">
    import AlignCenterIcon from '$lib/components/icons/AlignCenter.svelte';
    import AlignLeftIcon from '$lib/components/icons/AlignLeft.svelte';
    import AlignRightIcon from '$lib/components/icons/AlignRight.svelte';
    import Playground from '$lib/components/playground/Playground.svelte';
    import { ButtonIcon, Flexbox, InputGroup, Sizes1To3 } from 'sveltr';

    const sizes = Sizes1To3;
</script>

<Playground class="mb-5">
    <Flexbox slot="component" direction="column" gap="3">
        {#each sizes as size}
            <InputGroup>
                <ButtonIcon variant="clear" {size} active>
                    <AlignLeftIcon />
                </ButtonIcon>
                <ButtonIcon variant="clear" {size}>
                    <AlignCenterIcon />
                </ButtonIcon>
                <ButtonIcon variant="clear" {size}>
                    <AlignRightIcon />
                </ButtonIcon>
            </InputGroup>
        {/each}
    </Flexbox>
</Playground>
