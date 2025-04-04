export interface RetryOptions {
  times: number;
  delay: (retryCount: number) => number;
  shouldRetry: (error: any) => boolean;
}

export const retryConfig: RetryOptions = {
  times: 3,
  shouldRetry: (error: any) => {
    return !error.response || (error.response.status >= 500 && error.response.status <= 599);
  },
  delay: (retryCount: number) => {
    return Math.min(1000 * Math.pow(2, retryCount - 1), 10000);
  }
};

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  config: RetryOptions = retryConfig
): Promise<T> {
  let attempt = 0;

  while (attempt < config.times) {
    try {
      console.log(`[fetchWithRetry] Attempt ${attempt + 1}: ${url}`);
      const response = await fetch(url, options);
      if (!response.ok) {
        const error = new Error(`Request failed with status ${response.status}`);
        (error as any).response = response;
        throw error;
      }
      return await response.json();
    } catch (error: any) {
      console.error(`[fetchWithRetry] Error on attempt ${attempt + 1}: ${error.message}`);
      attempt++;
      if (attempt >= config.times || !config.shouldRetry(error)) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, config.delay(attempt)));
    }
  }

  throw new Error('Request failed after maximum retry attempts.');
}