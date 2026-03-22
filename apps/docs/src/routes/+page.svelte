<script lang="ts">
    import SvxuiIcon from '$lib/components/icons/SvxuiIcon.svelte';
    import { Button, Flexbox, Text } from 'svxui';
</script>

<Flexbox direction="column" align="center">
    <SvxuiIcon size="4rem" />

    <Text as="p" muted size="5" align="center">
        A modern component library for Svelte 5 inspired by Radix UI Themes, built on Radix Colors, and
        designed as a thoughtful alternative to Tailwind-based solutions. Accessible, themeable, and
        developer-friendly.
    </Text>

    <Flexbox gap="5" align="center" justify="center">
        <Button variant="solid" size="3" as="a" href="/docs">Get Started</Button>
    </Flexbox>
</Flexbox>
