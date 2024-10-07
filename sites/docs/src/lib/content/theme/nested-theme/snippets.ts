export const snippetInstall = `npm install -D svxui`;
export const snippetThemeProvider = `<ThemeProvider />`;
export const snippetThemeSelect = `<ThemeSelect />`;

export const snippetImport = `
<script>
    import { ThemeProvider } from 'svxui';
</script>
`;

export const snippetUsage = `
<script lang="ts">
    import { ThemeProvider } from 'svxui';
    export let title = '';
    let lala = $state();
</script>

<!-- Root theme, default strategy is 'system' -->
<ThemeProvider>
    ...

    <!-- Nested theme, forced 'dark' -->
    <ThemeProvider defaultStrategy="dark">
        ...

        <!-- Nested theme, forced 'light' -->
        <ThemeProvider defaultStrategy="light">...</ThemeProvider>
    </ThemeProvider>
</ThemeProvider>
`;
