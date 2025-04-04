type CacheKey = string;
type CacheEntry = {
  value: any;
  timestamp: number;
};

const cacheStore = new Map<CacheKey, CacheEntry>();

function generateKey(url: string, method: string, params?: any): string {
  const serializedParams = params ? `?${JSON.stringify(params)}` : '';
  return `${method.toUpperCase()}:${url}${serializedParams}`;
}

export const cache = {
  async get(key: string) {
    const entry = cacheStore.get(key);
    return entry?.value;
  },
  async set(key: string, value: any) {
    cacheStore.set(key, { value, timestamp: Date.now() });
  },
  async remove(key: string) {
    cacheStore.delete(key);
  },
  async invalidate(keys: string[]) {
    for (const key of keys) {
      cacheStore.delete(key);
    }
  },
  async has(key: string) {
    return cacheStore.has(key);
  },
  key: generateKey
};