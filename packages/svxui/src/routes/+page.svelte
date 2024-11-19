<script lang="ts">
    import DemoAccordion from './playground/DemoAccordion.svelte';
    import DemoBadge from './playground/DemoBadge.svelte';
    import DemoButton from './playground/DemoButton.svelte';
    import DemoCard from './playground/DemoCard.svelte';
    import DemoCheckbox from './playground/DemoCheckbox.svelte';
    import DemoDialog from './playground/DemoDialog.svelte';
    import DemoFloating from './playground/DemoFloating.svelte';
    import DemoInput from './playground/DemoInput.svelte';
    import DemoInputGroup from './playground/DemoInputGroup.svelte';
    import DemoInputNumber from './playground/DemoInputNumber.svelte';
    import DemoInputRange from './playground/DemoInputRange.svelte';
    import DemoLink from './playground/DemoLink.svelte';
    import DemoPanel from './playground/DemoPanel.svelte';
    import DemoRadio from './playground/DemoRadio.svelte';
    import DemoSelect from './playground/DemoSelect.svelte';
    import DemoSeparator from './playground/DemoSeparator.svelte';
    import DemoSwitch from './playground/DemoSwitch.svelte';
    import DemoTab from './playground/DemoTab.svelte';
    import DemoText from './playground/DemoText.svelte';
    import DemoTextarea from './playground/DemoTextarea.svelte';
    import DemoThemeSelect from './playground/DemoThemeSelect.svelte';
</script>

<h1>Overlay components</h1>
<DemoDialog />
<DemoFloating />
<hr />

<h1>Renderless components</h1>
<DemoAccordion />
<DemoTab />
<hr />

<h1>Typography components</h1>
<DemoText />
<DemoLink />
<hr />

<h1>Input components</h1>
<DemoButton />
<DemoCheckbox />
<DemoInput />
<DemoInputNumber />
<DemoInputRange />
<DemoRadio />
<DemoSelect />
<DemoSwitch />
<DemoTextarea />
<DemoInputGroup />
<hr />

<h1>Bloc components</h1>
<DemoCard />
<DemoPanel />
<DemoBadge />
<DemoSeparator />
<hr />

<h1>Theme components</h1>
<DemoThemeSelect />
