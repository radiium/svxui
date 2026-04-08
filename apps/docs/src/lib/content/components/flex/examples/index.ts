import Form, { source as FormSrc } from './Form.svelte?withSource';
import Card_list, { source as Card_listSrc } from './Card_list.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Wrap_rows, { source as Wrap_rowsSrc } from './Wrap_rows.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Form',
            Component: Form,
            ...FormSrc
        },
        {
            title: 'Card list',
            Component: Card_list,
            ...Card_listSrc
        },
        {
            title: 'Wrap rows',
            Component: Wrap_rows,
            ...Wrap_rowsSrc
        }
    ]
};
