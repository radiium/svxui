// File generated, do not modify
import Form_field, { source as Form_fieldSrc } from './Form_field.svelte?withSource';
import List_cards, { source as List_cardsSrc } from './List_cards.svelte?withSource';
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
            title: 'Form field',
            Component: Form_field,
            ...Form_fieldSrc
        },
        {
            title: 'List cards',
            Component: List_cards,
            ...List_cardsSrc
        },
        {
            title: 'Wrap rows',
            Component: Wrap_rows,
            ...Wrap_rowsSrc
        }
    ]
};
