export type FalsyValue = null | void | false | 0 | '';

/**
 * Returns with list with falsy values filtered out in a strict
 * typed way
 *
 * @public
 * @param list
 */
export const getFiltered = <T>(list: (T | FalsyValue)[]): T[] => {
    return list.filter(Boolean) as T[];
};
