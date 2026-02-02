/**
 * Selection value type depending on single or multiple mode.
 */
export type SelectionStateValue<Value, Multiple extends boolean = true> =
    | (Multiple extends true ? Value[] : Value)
    | null
    | undefined;

/**
 * Selection state options including the value state to manage single or multiple selection
 */
export type SelectionStateOptions<Value, Multiple extends boolean> = {
    /**
     * Current controlled value
     */
    value?: SelectionStateValue<Value, Multiple>;
    /**
     * Can select single or multiple value
     */
    multiple?: Multiple;
};
