'use client';
import { useCallback, useState } from 'react';
import { safeFetch, HTTPError } from '../lib/safeFetch'

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <T,>(url: string, init?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const data = await safeFetch<T>(url, init);
      return data;
    } catch (e) {
      const err = e as HTTPError;
      setError(err.message);
      // If you use a toast lib: toast.error(err.message)
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}
