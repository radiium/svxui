export type SelectionStateValue<T, Multiple extends boolean = true> =
    | (Multiple extends true ? T[] : T)
    | null
    | undefined;

export type SelectionStateProps<T, Multiple extends boolean = false> = {
    value?: () => SelectionStateValue<T, Multiple>;
    onValueChange?: (SelectionStateValue: SelectionStateValue<T, Multiple>) => void;
    multiple?: () => Multiple;
};
