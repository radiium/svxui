export type FloatingPatternContext = {
    pattern?: 'tooltip' | 'popover';
    open?: boolean;
    triggerId?: string;
    contentId?: string;
};

export type FloatingPatternState = {
    readonly triggerAttrs: Record<string, unknown>;
    readonly contentAttrs: Record<string, unknown>;
};

export class FloatingPattern {
    static resolve(context: FloatingPatternContext): FloatingPatternState {
        switch (context.pattern) {
            case 'tooltip':
                return this.#tooltip(context);
            case 'popover':
                return this.#popover(context);
            default:
                return this.#default(context);
        }
    }

    /**
     *  Default pattern
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static #default(_: FloatingPatternContext): FloatingPatternState {
        return {
            get triggerAttrs(): Record<string, unknown> {
                return {};
            },
            get contentAttrs(): Record<string, unknown> {
                return {};
            }
        };
    }

    /**
     * Tooltip pattern
     * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/}
     *
     * @param context
     * @returns
     */
    static #tooltip(context: FloatingPatternContext): FloatingPatternState {
        return {
            get triggerAttrs(): Record<string, unknown> {
                return {
                    'aria-describedby': context.contentId
                };
            },
            get contentAttrs(): Record<string, unknown> {
                return {
                    role: 'tooltip'
                };
            }
        };
    }

    /**
     * Popover pattern
     * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/}
     *
     * @param context
     * @returns
     */
    static #popover(context: FloatingPatternContext): FloatingPatternState {
        return {
            get triggerAttrs(): Record<string, unknown> {
                return {
                    'aria-haspopup': 'dialog',
                    'aria-expanded': context.open,
                    'aria-controls': context.contentId
                };
            },
            get contentAttrs(): Record<string, unknown> {
                return {
                    role: 'dialog'
                };
            }
        };
    }
}
