import clsx from 'clsx';
import { ClassNameValue, twMerge } from 'tailwind-merge';

type ClassNameFunction<T = Record<string, unknown>> = (state: T) => string | undefined;

export function cn<T = Record<string, unknown>>(
  ...classes: (ClassNameFunction<T> | ClassNameValue | undefined)[]
) {
  const processedClasses = classes.map((cls) => {
    if (typeof cls === 'function') {
      // For @base-ui components that accept className as a function
      // We call it with an empty state object
      return cls({} as T);
    }
    return cls;
  });
  return twMerge(clsx(processedClasses));
}
