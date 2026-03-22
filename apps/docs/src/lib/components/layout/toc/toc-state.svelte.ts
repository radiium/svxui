import { isBrowser, stringToId } from '$lib/utils/functions';

type TocItem = {
    id: string;
    text: string;
    level: number;
};

export type TOCStateOptions = {
    container: string;
    ignoreds: string[];
    currentId?: string;
    currentText?: string;
    onSelect?: () => void;
};

class TOCState {
    #items: TocItem[] = $state([]);
    #mutationObserver: MutationObserver | null = null;
    #intersectionObserver: IntersectionObserver | null = null;
    #container = 'body';
    #ignoreds: string[] = [];
    #current: TocItem | undefined = $state(undefined);

    constructor(options: TOCStateOptions) {
        this.#container = options.container;
        this.#ignoreds = options.ignoreds;
    }

    get items() {
        return this.#items;
    }

    get current() {
        return this.#current;
    }

    init = () => {
        if (!isBrowser()) return;
        this.#startMutationObserver();
        this.#update();

        return () => {
            this.#mutationObserver?.disconnect();
            this.#intersectionObserver?.disconnect();
        };
    };

    select = (item?: TocItem) => {
        this.#current = item;
    };

    isActive = (item: TocItem) => {
        return this.#current?.id === item.id;
    };

    #update = () => {
        if (!isBrowser()) return;
        this.#build();
        this.#startIntersectionObserver();
    };

    #build = () => {
        const root = document.querySelector(this.#container);
        if (!root) return;

        const headings = Array.from(root.querySelectorAll('h2, h3, h4, h5, h6')) as HTMLElement[];

        const filtered = headings.filter((el) => {
            return !this.#ignoreds.some((selector) => el.closest(selector));
        });

        this.#items = filtered.map((el) => {
            if (!el.id) {
                el.id = stringToId(el.textContent || '');
            }

            return {
                id: el.id,
                text: el.textContent || '',
                level: Number(el.tagName[1])
            };
        });
    };

    #startMutationObserver = () => {
        if (this.#mutationObserver) this.#mutationObserver?.disconnect();

        const root = document.querySelector(this.#container);
        if (!root) return;

        this.#mutationObserver = new MutationObserver(() => {
            this.#current = undefined;
            this.#update();
        });
        this.#mutationObserver.observe(root, { childList: true, subtree: true });
    };

    #startIntersectionObserver = () => {
        if (this.#intersectionObserver) this.#intersectionObserver?.disconnect();
        this.#intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.select(this.items.find((item) => item.id === entry.target.id));
                    }
                });
            },
            {
                rootMargin: '0px 0px -65% 0px',
                threshold: 0
            }
        );

        this.items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) this.#intersectionObserver?.observe(el);
        });
    };
}

export const tocState = new TOCState({
    container: 'main',
    ignoreds: ['.example']
});
