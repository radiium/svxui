import type { DocPageProps } from '$lib/doc.types';
import SampleButtonOnly from './SampleButtonOnly.svelte';
import SampleButtonOnlyCode from './SampleButtonOnly.svelte?raw';

import SampleButtonIconOnly from './SampleButtonIconOnly.svelte';
import SampleButtonIconOnlyCode from './SampleButtonIconOnly.svelte?raw';
import SampleInputSelect from './SampleInputSelect.svelte';
import SampleInputSelectCode from './SampleInputSelect.svelte?raw';
import { inputGroupSchema } from './schema.js';
import SampleInputButton from './SampleInputButton.svelte';
import SampleInputButtonCode from './SampleInputButton.svelte?raw';
import SampleInputButtonIcon from './SampleInputButtonIcon.svelte';
import SampleInputButtonIconCode from './SampleInputButtonIcon.svelte?raw';

export default {
    title: 'Input Group',
    playground: undefined,
    schemas: [inputGroupSchema],
    samples: [
        {
            title: 'Button only',
            component: SampleButtonOnly,
            componentCode: SampleButtonOnlyCode
        },
        {
            title: 'Button icon only',
            component: SampleButtonIconOnly,
            componentCode: SampleButtonIconOnlyCode
        },
        {
            title: 'Input + Select',
            component: SampleInputSelect,
            componentCode: SampleInputSelectCode
        },
        {
            title: 'Button + Input',
            component: SampleInputButton,
            componentCode: SampleInputButtonCode
        },
        {
            title: 'Button icon + Input',
            component: SampleInputButtonIcon,
            componentCode: SampleInputButtonIconCode
        }
    ]
} satisfies DocPageProps;
