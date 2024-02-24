export const pick = <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result: Partial<Pick<T, K>> = {};
  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result as Pick<T, K>;
};
