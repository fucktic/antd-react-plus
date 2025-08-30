const opt = Object.prototype.toString;

export function isObject<T extends unknown>(
    obj: T
): obj is Extract<T, Record<string, any>> {
    return opt.call(obj) === '[object Object]';
}
