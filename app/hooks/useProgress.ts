import { useCallback } from 'react';
import NProgress from 'nprogress';

interface ProgressHook {
  start: () => void;
  set: (progress: number) => void;
  inc: (step?: number) => void;
  done: () => void;
  status: number | null;
}

export const useProgress = (): ProgressHook => {
  const start = useCallback(() => {
    NProgress.start();
  }, []);

  const set = useCallback((progress: number) => {
    NProgress.set(Math.max(0, Math.min(1, progress)));
  }, []);

  const inc = useCallback((step?: number) => {
    NProgress.inc(step);
  }, []);

  const done = useCallback(() => {
    NProgress.done();
  }, []);

  const getStatus = useCallback(() => {
    return NProgress.status;
  }, []);

  return {
    start,
    set,
    inc,
    done,
    get status() {
      return getStatus();
    }
  };
};

// Higher-order function to wrap async functions with progress
export const withProgress = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  options?: {
    startProgress?: number;
    incrementStep?: number;
    autoIncrement?: boolean;
  }
) => {
  return async (...args: T): Promise<R> => {
    const { startProgress = 0.1, incrementStep = 0.2, autoIncrement = true } = options || {};
    
    try {
      NProgress.start();
      NProgress.set(startProgress);
      
      let interval: NodeJS.Timeout | undefined;
      
      if (autoIncrement) {
        interval = setInterval(() => {
          const current = NProgress.status;
          if (current && current < 0.8) {
            NProgress.inc(incrementStep);
          }
        }, 300);
      }
      
      const result = await fn(...args);
      
      if (interval) {
        clearInterval(interval);
      }
      
      NProgress.done();
      return result;
    } catch (error) {
      NProgress.done();
      throw error;
    }
  };
};