<script lang="ts">
    import AlignCenterIcon from '$lib/components/icons/AlignCenter.svelte';
    import AlignLeftIcon from '$lib/components/icons/AlignLeft.svelte';
    import AlignRightIcon from '$lib/components/icons/AlignRight.svelte';
    import PlaygroundWrapper from '$lib/components/playground/PlaygroundWrapper.svelte';
    import { ButtonIcon, Flexbox, InputGroup, Sizes1To3 } from 'svxui';

    const sizes = Sizes1To3;
</script>

<PlaygroundWrapper class="mb-5">
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
</PlaygroundWrapper>
