---
title: Dialog
description: Dialog component
---

<script lang="ts">
    import Button from '$lib/components/Button/Button.svelte';
    import Dialog from '$lib/components/Dialog/Dialog.svelte';
    import {docDialogPropsDefs} from '$lib/components/Dialog/Dialog.props.js';
    import ApiReference from '$lib-doc/components/ApiReference.svelte';
    import Playground from '$lib-doc/components/Playground.svelte';
    import PlaygroundForm from '$lib-doc/components/PlaygroundForm.svelte';

    let props = {}
</script>

## Playground

<Playground>
<div slot="component">
    <Button variant="soft" on:click={() => props.isOpen = true}>open</Button>
    <Dialog  {...props} bind:isOpen={props.isOpen}>
        <div>
            Content
            <footer class="mt-6">
                <Button color="primary" variant="soft" on:click={() => props.isOpen = false} fullWidth>
                    close
                </Button>
            </footer>
        </div>
    </Dialog>
    </div>
    <PlaygroundForm slot="form" bind:props schema={docDialogPropsDefs} />
</Playground>

## API Reference

<ApiReference data={docDialogPropsDefs}></ApiReference>
