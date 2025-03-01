import { page } from '$app/state';
import { MediaQuery } from 'svelte/reactivity';

class LayoutState {
    /*
    --breakpoint-sm: 40rem;
    --breakpoint-md: 48rem;
    --breakpoint-lg: 64rem;
    --breakpoint-xl: 80rem;
    --breakpoint-2xl: 96rem;
    */
    #isMobile = new MediaQuery('(max-width: 520px)', true);
    #isTablet = new MediaQuery('(min-width: 520.02px) and (max-width: 825px)', true);
    #isLaptop = new MediaQuery('(min-width: 825.02px) and (max-width: 1024px)', true);
    #isDesktop = new MediaQuery('(min-width: 1024.02px)', true);

    get isMobile() {
        return this.#isMobile.current;
    }

    get isTablet() {
        return this.#isTablet.current;
    }

    get isLaptop() {
        return this.#isLaptop.current;
    }

    get isDesktop() {
        return this.#isDesktop.current;
    }

    #isMenuOpen = $state(false);
    #isHomePage = $derived(page.url.pathname === '/');
    #hasMenu = $derived(!this.isHomePage);
    #hasMenuMobile = $derived((this.#isMobile.current || this.#isTablet.current) && !this.isHomePage);
    #hasTOC = $derived(this.#isDesktop.current && !this.isHomePage);

    get isMenuOpen() {
        return this.#isMenuOpen;
    }

    get isHomePage() {
        return this.#isHomePage;
    }

    get hasMenu() {
        return this.#hasMenu;
    }

    get hasMenuMobile() {
        return this.#hasMenuMobile;
    }

    get hasTOC() {
        return this.#hasTOC;
    }

    open = (): void => {
        this.#isMenuOpen = true;
    };

    close = (): void => {
        this.#isMenuOpen = false;
    };

    toggle = (): void => {
        this.#isMenuOpen = !this.#isMenuOpen;
    };

    handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            this.close();
        }
    };
}

export const layout = new LayoutState();
