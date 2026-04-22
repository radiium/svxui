import type { ExamplesConfig } from '$lib/types';
import Cluster, { source as ClusterSrc } from './Cluster.svelte?withSource';
import Cluster_flex_basis, { source as Cluster_flex_basisSrc } from './Cluster_flex_basis.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import Stack, { source as StackSrc } from './Stack.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Stack',
            Component: Stack,
            ...StackSrc
        },
        {
            title: 'Cluster',
            Component: Cluster,
            ...ClusterSrc
        },
        {
            title: 'Cluster with flex-basis',
            Component: Cluster_flex_basis,
            ...Cluster_flex_basisSrc
        }
    ]
};
