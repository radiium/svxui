import type { ExamplesConfig } from '$lib/types';
import AccordionHorizontal, {
    source as AccordionHorizontalSrc
} from './AccordionHorizontal.svelte?withSource';
import AccordionVertical, { source as AccordionVerticalSrc } from './AccordionVertical.svelte?withSource';
import AccordionVerticalCardList, {
    source as AccordionVerticalCardListSrc
} from './AccordionVerticalCardList.svelte?withSource';
import Card, { source as CardSrc } from './Card.svelte?withSource';
import CardImage, { source as CardImageSrc } from './CardImage.svelte?withSource';
import CardList, { source as CardListSrc } from './CardList.svelte?withSource';
import CheckboxList, { source as CheckboxListSrc } from './CheckboxList.svelte?withSource';
import CheckboxList2, { source as CheckboxList2Src } from './CheckboxList2.svelte?withSource';
import FormLogin, { source as FormLoginSrc } from './FormLogin.svelte?withSource';
import RadioList, { source as RadioListSrc } from './RadioList.svelte?withSource';
import RadioList2, { source as RadioList2Src } from './RadioList2.svelte?withSource';

export const examples: ExamplesConfig = {
    items: [
        // Accordions
        {
            title: 'Accordion vertical',
            Component: AccordionVertical,
            ...AccordionVerticalSrc
        },
        {
            title: 'Accordion vertical card list',
            Component: AccordionVerticalCardList,
            ...AccordionVerticalCardListSrc
        },
        {
            title: 'Accordion horizontal',
            Component: AccordionHorizontal,
            ...AccordionHorizontalSrc
        },
        // VCards
        {
            title: 'Card',
            Component: Card,
            ...CardSrc
        },
        {
            title: 'Card with image',
            Component: CardImage,
            ...CardImageSrc
        },
        {
            title: 'Card list',
            Component: CardList,
            ...CardListSrc
        },
        // Checkbox
        {
            title: 'Checkbox list',
            Component: CheckboxList,
            ...CheckboxListSrc,
            column: true
        },
        {
            title: 'Checkbox list 2',
            Component: CheckboxList2,
            ...CheckboxList2Src,
            column: true
        },
        // Radio
        {
            title: 'Radio list',
            Component: RadioList,
            ...RadioListSrc,
            column: true
        },
        {
            title: 'Radio list 2',
            Component: RadioList2,
            ...RadioList2Src,
            column: true
        },
        // Radio
        {
            title: 'Form login',
            Component: FormLogin,
            ...FormLoginSrc,
            column: true
        }
    ]
};
