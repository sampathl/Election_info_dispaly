import { type DependencyList, useEffect, useState } from 'react';

interface UseAsyncDataResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  reload: () => void;
}

export function useAsyncData<T>(
  loader: () => Promise<T>,
  dependencies: DependencyList,
): UseAsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestKey, setRequestKey] = useState(0);

  // The caller owns the dependency list so route pages can keep loaders local to the component.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setError(null);

    loader()
      .then((result) => {
        if (!isActive) {
          return;
        }

        setData(result);
        setIsLoading(false);
      })
      .catch((reason: unknown) => {
        if (!isActive) {
          return;
        }

        setError(reason instanceof Error ? reason.message : 'Something went wrong.');
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [...dependencies, requestKey]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return {
    data,
    error,
    isLoading,
    reload: () => setRequestKey((value) => value + 1),
  };
}
