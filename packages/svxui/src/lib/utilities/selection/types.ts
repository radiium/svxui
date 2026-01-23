/**
 * Selection value type resolver
 */
export type SelectionValue<Value, Multiple extends boolean = true> =
    | (Multiple extends true ? Value[] : Value)
    | null
    | undefined;

/**
 * Option of selection state
 */
export type SelectionOptions<Value, Multiple extends boolean> = {
    /**
     * Current conrolled value
     */
    value?: SelectionValue<Value, Multiple>;
    /**
     * Can select single or multiple value
     */
    multiple?: Multiple;
};
