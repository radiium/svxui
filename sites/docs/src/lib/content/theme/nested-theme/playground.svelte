<script>
    import { Card, ThemeProvider } from 'svxui';
    import SampleFormCard from '$lib/components/samples/SampleFormCard.svelte';
    import H2 from '$lib/components/markdown/h2.svelte';
    import Blockquote from '$lib/components/markdown/blockquote.svelte';
    import {
        snippetThemeProvider,
        snippetThemeSelect,
        snippetUsage,
        snippetInstall,
        snippetImport
    } from './snippets';
    import P from '$lib/components/markdown/p.svelte';
    // import Code from '$lib/components/code/.svelte';
</script>

<H2 id="description">Description</H2>

<!-- <Code lang="bash" input={snippetInstall} inline /> -->

<!-- <P>
    The <Code lang="svelte" input={snippetThemeProvider} inline /> component can be nested.
</P> -->

<!-- <Blockquote>
    Only the root <Code lang="svelte" input={snippetThemeProvider} inline /> will respond to the <Code
        lang="svelte"
        input={snippetThemeSelect}
        inline
    /> change.
</Blockquote> -->

<H2 id="usage">Usage</H2>
<!-- 
<Code lang="svelte" input={snippetUsage} copy lineNumbers lineNumbersStart={2} />
<Card size="0" class="mt-5">
    <Code lang="svelte" input={snippetUsage} copy />
</Card>
<Code input={snippetUsage} lang="svelte" lineNumbers /> -->

## Example

<ThemeProvider defaultStrategy="dark">
    <SampleFormCard title="Forced dark theme">
        <ThemeProvider defaultStrategy="light">
            <SampleFormCard title="Forced light theme">
                <ThemeProvider defaultStrategy="system">
                    <SampleFormCard title="Forced sytem theme" />
                </ThemeProvider>
            </SampleFormCard>
        </ThemeProvider>
    </SampleFormCard>
</ThemeProvider>
