import Checkbox_plus_Input, {
    source as Checkbox_plus_InputSrc
} from './Checkbox_plus_Input.svelte?withSource';
import Input_plus_Button, { source as Input_plus_ButtonSrc } from './Input_plus_Button.svelte?withSource';
import Input_plus_InputRange, {
    source as Input_plus_InputRangeSrc
} from './Input_plus_InputRange.svelte?withSource';
import Input_plus_Select, { source as Input_plus_SelectSrc } from './Input_plus_Select.svelte?withSource';
import Input_plus_Text, { source as Input_plus_TextSrc } from './Input_plus_Text.svelte?withSource';
import Input_sizes, { source as Input_sizesSrc } from './Input_sizes.svelte?withSource';
import Overview, { source as OverviewSrc } from './Overview.svelte?withSource';
import type { ExamplesConfig } from '$lib/types';
import Toggle, { source as ToggleSrc } from './Toggle.svelte?withSource';

export const examples: ExamplesConfig = {
    overview: {
        Component: Overview,
        ...OverviewSrc
    },
    items: [
        {
            title: 'Checkbox +  Input',
            Component: Checkbox_plus_Input,
            ...Checkbox_plus_InputSrc
        },
        {
            title: 'Input +  Button',
            Component: Input_plus_Button,
            ...Input_plus_ButtonSrc
        },
        {
            title: 'Input +  Input Range',
            Component: Input_plus_InputRange,
            ...Input_plus_InputRangeSrc
        },
        {
            title: 'Input +  Select',
            Component: Input_plus_Select,
            ...Input_plus_SelectSrc
        },
        {
            title: 'Input +  Text',
            Component: Input_plus_Text,
            ...Input_plus_TextSrc
        },
        {
            title: 'Input sizes',
            Component: Input_sizes,
            ...Input_sizesSrc
        },
        {
            title: 'Toggle',
            Component: Toggle,
            ...ToggleSrc
        }
    ]
};
