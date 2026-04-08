<script>
    import { Button, Flex, Input, Panel, focustrap } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlInput from '../../controls/ControlInput.svelte';
    import Playground from '../../controls/Playground.svelte';

    let enabled = $state(false);
    let initialFocus = $state('[data-initialfocus]');
    let enabled2 = $state(false);
</script>

<h1>Focustrap</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />
        <ControlInput label="initialFocus" bind:value={initialFocus} />
        <ControlCheckbox label="enabled2" bind:checked={enabled2} />
    {/snippet}

    <Panel
        {@attach focustrap({
            get enabled() {
                return enabled;
            },
            get initialFocus() {
                return initialFocus;
            }
        })}
    >
        <Flex justify="start" direction="column" gap="3" as="form">
            <Input placeholder="First name" />
            <Input placeholder="Last name" data-initialfocus />
            <Flex justify="start" gap="3">
                <Button variant="outline" tabindex={0}>cancel</Button>
                <Button variant="soft" tabindex={0} onclick={() => (enabled = false)}>confirm</Button>
            </Flex>
        </Flex>
    </Panel>

    <Panel
        {@attach focustrap({
            get enabled() {
                return enabled2;
            }
        })}
    >
        <Flex justify="start" direction="column" gap="3" as="form">
            <Input placeholder="First name" />
            <Input placeholder="Last name" data-initialfocus />
            <Flex justify="start" gap="3">
                <Button variant="outline" tabindex={0}>cancel</Button>
                <Button variant="soft" tabindex={0} onclick={() => (enabled2 = false)}>confirm</Button>
            </Flex>
        </Flex>
    </Panel>
</Playground>
