export const noop = () => {}

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isFunction = (value: unknown): value is Function => value instanceof Function;

type PlainObject = Record<string, unknown>;

export const omit = (object: object, keysToExclude: string[]) => {
    const result: PlainObject  = {}

    const plainObject = object as PlainObject

    for (let key in plainObject) {
        if (!keysToExclude.includes(key)) {
            result[key] = plainObject[key]
        }
    }

    return result;
}