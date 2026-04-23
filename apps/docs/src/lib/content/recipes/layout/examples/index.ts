import type { ExamplesConfig } from '$lib/types';
import AccordionHorizontal, {
    source as AccordionHorizontalSrc
} from './AccordionHorizontal.svelte?withSource';
import AccordionVerticalCard, {
    source as AccordionVerticalCardSrc
} from './AccordionVerticalCard.svelte?withSource';
import AccordionVerticalCardList, {
    source as AccordionVerticalCardListSrc
} from './AccordionVerticalCardList.svelte?withSource';
import Card, { source as CardSrc } from './Card.svelte?withSource';
import CardImage, { source as CardImageSrc } from './CardImage.svelte?withSource';
import CardList, { source as CardListSrc } from './CardList.svelte?withSource';
import CheckboxList, { source as CheckboxListSrc } from './CheckboxList.svelte?withSource';
import RadioList, { source as RadioListSrc } from './RadioList.svelte?withSource';

export const examples: ExamplesConfig = {
    items: [
        {
            title: 'Accordion vertical card',
            Component: AccordionVerticalCard,
            ...AccordionVerticalCardSrc
        },
        {
            title: 'Accordion vertical card list',
            Component: AccordionVerticalCardList,
            ...AccordionVerticalCardListSrc
        },
        {
            title: 'Horizontal accordion',
            Component: AccordionHorizontal,
            ...AccordionHorizontalSrc
        },
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
        {
            title: 'Checkbox list',
            Component: CheckboxList,
            ...CheckboxListSrc,
            column: true
        },
        {
            title: 'Radio list',
            Component: RadioList,
            ...RadioListSrc,
            column: true
        }
    ]
};
