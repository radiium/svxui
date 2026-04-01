/* eslint-disable @typescript-eslint/no-explicit-any */
type CartesianOptions<T> = {
    [K in keyof T]?: readonly NonNullable<T[K]>[];
};

type CartesianResult<T, O extends CartesianOptions<T>> = {
    [K in keyof O]: O[K] extends readonly (infer V)[] ? V : never;
};

export function cartesianProduct<
    T extends Record<string, any>,
    O extends CartesianOptions<T> = CartesianOptions<T>
>(options: O): CartesianResult<T, O>[] {
    const entries = Object.entries(options) as {
        [K in keyof O]: [K, O[K]];
    }[keyof O][];

    return entries.reduce<CartesianResult<T, O>[]>((acc, [key, values]) => {
        if (!values) return acc;

        if (acc.length === 0) {
            return values.map((value) => ({
                [key]: value
            })) as CartesianResult<T, O>[];
        }

        return acc.flatMap((existing) =>
            values.map((value) => ({
                ...existing,
                [key]: value
            }))
        );
    }, []);
}

export function groupBy<Item extends Record<string, any>, Key extends keyof Item>(
    items: readonly Item[],
    key: Key
): Item[][] {
    const result: Record<PropertyKey, Item[]> = {};

    for (const item of items) {
        const value = item[key] as PropertyKey;

        if (!result[value]) {
            result[value] = [];
        }

        result[value].push(item);
    }

    return Object.values(result);
}
