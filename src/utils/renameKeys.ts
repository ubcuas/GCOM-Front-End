// used for formatting axios response data

export const renameKeys = (keysMap: any, obj: any) =>
    Object.keys(obj).reduce(
        (acc, key) => ({
            ...acc,
            ...{ [keysMap[key] || key]: obj[key] },
        }),
        {},
    );
