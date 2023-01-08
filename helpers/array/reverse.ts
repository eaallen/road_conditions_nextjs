
/**
 * Returns a copy of the given array in reverse
 */
export default function reverse<T>(arr: T[]) {
    const out = []
    for (const item of arr) {
        out.unshift(item)
    }
    return out
}