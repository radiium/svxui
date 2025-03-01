/* eslint-disable @typescript-eslint/no-unused-vars */
export const noopStorage = {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {}
} satisfies Partial<Storage>;
