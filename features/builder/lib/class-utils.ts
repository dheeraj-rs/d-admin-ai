type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassValue[];

interface ClassDictionary {
  [key: string]: boolean | undefined | null;
}

export const classMixin = (...classes: ClassValue[]): string => {
  const result = new Set<string>();
  const addClass = (item: ClassValue): void => {
    if (!item) return;
    if (typeof item === 'string' || typeof item === 'number') {
      result.add(String(item));
      return;
    }
    if (Array.isArray(item)) {
      item.forEach(addClass);
      return;
    }
    if (typeof item === 'object') {
      Object.entries(item).forEach(([className, condition]) => {
        let shouldAdd = false;
        if (typeof condition === 'boolean') {
          shouldAdd = condition;
        } else if (condition != null) {
          shouldAdd = Boolean(condition);
        }
        if (shouldAdd) {
          result.add(className);
        }
      });
    }
  };
  classes.forEach(addClass);
  return Array.from(result).filter(Boolean).join(' ');
};
