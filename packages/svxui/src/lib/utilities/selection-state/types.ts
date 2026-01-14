export type SelectionValue<Value, Multiple extends boolean = true> =
    | (Multiple extends true ? Value[] : Value)
    | null
    | undefined;

export type SelectionOptions<Value, Multiple extends boolean> = {
    value?: SelectionValue<Value, Multiple>;
    multiple?: Multiple;
};
