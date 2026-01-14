<script>
    import { Button, Flexbox, Input, Panel, focustrap } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlInput from '../../controls/ControlInput.svelte';
    import Playground from '../../controls/Playground.svelte';

    let enabled = $state(false);
    let initialFocus = $state('[data-initialfocus]');
    let returnFocus = $state(false);
</script>

<h1>Focustrap</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />

        <ControlInput label="initialFocus" bind:value={initialFocus} />
        <ControlInput label="returnFocus" disabled bind:value={returnFocus} />
    {/snippet}

    <Panel
        {@attach focustrap({
            get enabled() {
                return enabled;
            },
            get initialFocus() {
                return initialFocus;
            },
            get returnFocus() {
                return returnFocus;
            }
        })}
    >
        <Flexbox direction="column" gap="3" as="form">
            <Input placeholder="First name" />
            <Input placeholder="Last name" data-initialfocus />
            <Flexbox gap="3">
                <Button variant="outline">cancel</Button>
                <Button variant="soft" onclick={() => (enabled = false)}>confirm</Button>
            </Flexbox>
        </Flexbox>
    </Panel>
</Playground>
