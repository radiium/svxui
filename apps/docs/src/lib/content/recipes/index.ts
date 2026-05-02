import type { ExamplesConfig } from '$lib/types';
import VerticalAccordion, {
    source as VerticalAccordionSrc
} from './VerticalAccordion.svelte?withSource';
import AccordionCardList, {
    source as AccordionCardListSrc
} from './AccordionCardList.svelte?withSource';
import HorizontalAccordion, {
    source as HorizontalAccordionSrc
} from './HorizontalAccordion.svelte?withSource';
import Card, { source as CardSrc } from './Card.svelte?withSource';
import CardWithImage, { source as CardWithImageSrc } from './CardWithImage.svelte?withSource';
import UserList, { source as UserListSrc } from './UserList.svelte?withSource';
import CheckboxGroup, { source as CheckboxGroupSrc } from './CheckboxGroup.svelte?withSource';
import CheckboxList, { source as CheckboxListSrc } from './CheckboxList.svelte?withSource';
import RadioGroup, { source as RadioGroupSrc } from './RadioGroup.svelte?withSource';
import RadioListWithDescription, {
    source as RadioListWithDescriptionSrc
} from './RadioListWithDescription.svelte?withSource';
import LoginForm, { source as LoginFormSrc } from './LoginForm.svelte?withSource';

export const examples: ExamplesConfig = {
    items: [
        // Accordions
        {
            title: 'Vertical accordion',
            Component: VerticalAccordion,
            ...VerticalAccordionSrc
        },
        {
            title: 'Accordion card list',
            Component: AccordionCardList,
            ...AccordionCardListSrc
        },
        {
            title: 'Horizontal accordion',
            Component: HorizontalAccordion,
            ...HorizontalAccordionSrc
        },
        // Cards
        {
            title: 'Card',
            Component: Card,
            ...CardSrc
        },
        {
            title: 'Card with image',
            Component: CardWithImage,
            ...CardWithImageSrc
        },
        {
            title: 'User list',
            Component: UserList,
            ...UserListSrc
        },
        // Checkbox
        {
            title: 'Checkbox group',
            Component: CheckboxGroup,
            ...CheckboxGroupSrc,
            column: true
        },
        {
            title: 'Checkbox list',
            Component: CheckboxList,
            ...CheckboxListSrc,
            column: true
        },
        // Radio
        {
            title: 'Radio group',
            Component: RadioGroup,
            ...RadioGroupSrc,
            column: true
        },
        {
            title: 'Radio list with description',
            Component: RadioListWithDescription,
            ...RadioListWithDescriptionSrc,
            column: true
        },
        // Form
        {
            title: 'Login form',
            Component: LoginForm,
            ...LoginFormSrc,
            column: true
        }
    ]
};
