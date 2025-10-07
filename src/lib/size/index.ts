const dictionary: string[] = ['kB', 'MB', 'GB', 'TB'];

/**
 * Returns with the rounded, formatted string representation on
 * the given size
 *
 * @private
 * @param size
 * @param suffix
 */
const getRoundedSize = (size: number, suffix: string): string => {
    return `${size.toFixed(2)} ${suffix}`;
};

/**
 * Returns the formatted size from the byte length
 *
 * @public
 * @param size
 */
export const getFormattedSize = (size: number = 0): string => {
    if (size < 1024) {
        return `${size} bytes`;
    }
    let last: string = '';

    for (const suffix of dictionary) {
        const next: number = size / 1024;

        if (next < 1) {
            return getRoundedSize(size, last);
        }
        last = suffix;
        size = next;
    }
    return getRoundedSize(size, last);
};
