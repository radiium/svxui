<script lang="ts">
    import Text from '$lib/components/text/components/text.svelte';
    import { clickoutside, Flex, Panel } from '$lib/index.js';
    import ControlCheckbox from '../../controls/ControlCheckbox.svelte';
    import ControlSelect from '../../controls/ControlSelect.svelte';
    import Playground from '../../controls/Playground.svelte';

    type EventType = 'pointerdown' | 'mousedown' | 'touchstart' | 'click';
    const eventTypeOptions: EventType[] = ['pointerdown', 'mousedown', 'touchstart', 'click'];

    let enabled: boolean = $state(false);
    let eventTarget: HTMLDivElement | undefined = $state();
    let eventType: EventType = $state(eventTypeOptions[0]);
    let countInside: number = $state(0);
    let countOutside: number = $state(0);
</script>

<h1>Clickoutside</h1>

<Playground>
    {#snippet controls()}
        <ControlCheckbox label="enabled" bind:checked={enabled} />
        <ControlSelect label="eventType" bind:value={eventType} options={eventTypeOptions} />
        <Text>countInside: {countInside}</Text>
        <Text>countOutside: {countOutside}</Text>
    {/snippet}

    <Panel variant="soft" p="9" bind:ref={eventTarget}>
        <Flex align="center" justify="center" gap="3">
            outside
            <Panel
                variant="clear"
                outline
                p="9"
                {@attach clickoutside({
                    enabled,
                    eventTarget,
                    eventType,
                    onClickOutside() {
                        countOutside++;
                    }
                })}
                onclick={() => {
                    if (enabled) countInside++;
                }}
            >
                inside
            </Panel>
        </Flex>
    </Panel>
</Playground>
