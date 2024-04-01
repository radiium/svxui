<script context="module">import '../../style.scss';
import { derived, writable } from 'svelte/store';
import { prefersColorSchemeDark, resolveStrategy, resolveScheme, resolveSchemeSystem, setThemeStorage } from './theme.utils.js';
import { defaultThemeProviderProps } from './ThemeProvider.props.js';
const schemeSystemStore = writable(resolveSchemeSystem());
const onSchemeSystemChange = () => {
    schemeSystemStore.set(resolveSchemeSystem());
};
</script>

<script>import { hasContext, onMount, setContext } from 'svelte';
import { isBrowser } from '../../utils/is-browser.js';
import { ThemeStrategy } from '../theme.types.js';
import { THEME_CONTEXT_KEY, THEME_STORAGE_KEY } from '../theme.constant.js';
export let strategy = defaultThemeProviderProps.strategy;
export let radius = defaultThemeProviderProps.radius;
let isRoot = !hasContext(THEME_CONTEXT_KEY);
const resolvedStrategy = resolveStrategy(strategy);
const strategyStore = writable(resolvedStrategy);
const schemeStore = writable(resolveScheme(resolvedStrategy));
$: {
    if ($strategyStore === ThemeStrategy.SYSTEM) {
        schemeStore.set($schemeSystemStore);
    }
}
$: {
    if (strategy) {
        strategyStore.set(strategy);
        schemeStore.set(resolveScheme(strategy));
    }
}
setContext(THEME_CONTEXT_KEY, {
    isRoot,
    strategy: derived(strategyStore, (value) => value),
    scheme: derived(schemeStore, (value) => value),
    updateStrategy: (newStrategy) => {
        if (isRoot) {
            setThemeStorage(THEME_STORAGE_KEY, newStrategy);
        }
        schemeStore.set(resolveScheme(newStrategy));
        strategyStore.set(newStrategy);
    }
});
onMount(() => {
    if (isRoot && isBrowser()) {
        prefersColorSchemeDark.addEventListener('change', onSchemeSystemChange);
        return () => {
            prefersColorSchemeDark.removeEventListener('change', onSchemeSystemChange);
        };
    }
});
</script>

<!-- <svelte:body class={$themeStore.theme} style={`color-scheme: ${$themeStore.theme};`} /> -->

<!--  data-radius={$themeStore.radius} -->
<div class="svxui" data-theme-root={isRoot} data-theme={$schemeStore} data-radius={radius} data-color="gray">
    <slot />
</div>
