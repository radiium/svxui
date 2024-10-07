---
title: Introduction
description:
category: index
---

<script>
    import { Badge, Text, Link, Separator } from 'sveltr';
    import H2 from '$lib/components/markdown/h2.svelte';
    import H3 from '$lib/components/markdown/h3.svelte';
    import P from '$lib/components/markdown/p.svelte';
</script>

<H3>SveltR, Small ui component library.</H3>
<Separator size="4" class="mt-3 mb-6"/>

<H2>Features</H2>

-   [x] <Text size="4">Color based on <Link color="primary" underline="hover" href="https://www.radix-ui.com/colors" title="https://www.radix-ui.com/colors">radix-color</Link></Text>
-   [x] <Text size="4">Light and dark theme</Text>
-   [x] <Text size="4">Persistent theme in localstorage</Text>
-   [ ] <Text size="4" style="opacity: 0.6;">Customizable theme radix-color</Text><Badge variant="outline" color="primary">soon</Badge>
-   [ ] <Text size="4" style="opacity: 0.6;">Compatible ssr ssg</Text><Badge variant="outline" color="primary">soon</Badge>
