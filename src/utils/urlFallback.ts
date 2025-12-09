/**
 * Utility functions for URL fallback mechanism
 * Tries primary URL first, falls back to secondary URL if primary is unreachable
 */

const PRIMARY_URL = "http://115.242.156.230:3000";
const FALLBACK_URL = "http://115.242.156.230:4000";
const TIMEOUT_MS = 3000; // 3 second timeout for checks

// Cache for URL availability checks (to avoid repeated checks)
let urlCache: { [key: string]: { available: boolean; timestamp: number } } = {};
const CACHE_DURATION = 10000; // Cache for only 10 seconds (reduced for faster detection)

/**
 * Check if a URL is reachable using multiple methods
 * Uses fetch with proper error handling and timeout
 */
async function isUrlReachable(url: string): Promise<boolean> {
  // Check cache first (but with shorter duration)
  const cached = urlCache[url];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.available;
  }

  // Method 1: Try fetch with no-cors first (fastest, but limited info)
  // This will resolve even if server is down, so we need method 2 for verification
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    // Try with no-cors first - this will resolve if network is reachable
    await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal,
      cache: "no-cache",
    });

    clearTimeout(timeoutId);
  } catch (error: any) {
    // Network error or timeout - server is definitely down
    urlCache[url] = { available: false, timestamp: Date.now() };
    return false;
  }

  // Method 2: Use XMLHttpRequest for better error detection
  // This gives us more control over detecting actual server errors
  return new Promise<boolean>((resolve) => {
    const xhr = new XMLHttpRequest();
    const timeout = setTimeout(() => {
      xhr.abort();
      urlCache[url] = { available: false, timestamp: Date.now() };
      resolve(false);
    }, TIMEOUT_MS);

    xhr.onload = () => {
      clearTimeout(timeout);
      // If we get any response (even 404/500), server is up
      if (xhr.status >= 200 || xhr.status >= 400) {
        urlCache[url] = { available: true, timestamp: Date.now() };
        resolve(true);
      } else {
        urlCache[url] = { available: false, timestamp: Date.now() };
        resolve(false);
      }
    };

    xhr.onerror = () => {
      clearTimeout(timeout);
      urlCache[url] = { available: false, timestamp: Date.now() };
      resolve(false);
    };

    xhr.ontimeout = () => {
      clearTimeout(timeout);
      urlCache[url] = { available: false, timestamp: Date.now() };
      resolve(false);
    };

    xhr.timeout = TIMEOUT_MS;
    xhr.open("HEAD", url, true);
    
    try {
      xhr.send();
    } catch (error) {
      clearTimeout(timeout);
      urlCache[url] = { available: false, timestamp: Date.now() };
      resolve(false);
    }
  });
}

/**
 * Get the best available URL (tries primary first, then fallback)
 * Returns the URL that is reachable, or primary as default
 */
export async function getAvailableUrl(): Promise<string> {
  try {
    // Try primary URL first with a quick check
    const primaryReachable = await Promise.race([
      isUrlReachable(PRIMARY_URL),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), TIMEOUT_MS))
    ]);

    if (primaryReachable) {
      return PRIMARY_URL;
    }

    // If primary fails, try fallback
    const fallbackReachable = await Promise.race([
      isUrlReachable(FALLBACK_URL),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), TIMEOUT_MS))
    ]);

    if (fallbackReachable) {
      return FALLBACK_URL;
    }

    // If both fail or timeout, return primary as default
    // Browser will show its own error message
    return PRIMARY_URL;
  } catch (error) {
    console.error("Error checking URL availability:", error);
    return PRIMARY_URL;
  }
}

/**
 * Handle link click with fallback mechanism
 * Checks URL availability before opening
 */
export async function handleUrlClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const target = (e.currentTarget as HTMLAnchorElement).target;

  try {
    // Get the available URL (primary or fallback)
    const url = await getAvailableUrl();
    
    // Open the available URL
    if (target === "_blank") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  } catch (error) {
    console.error("Error in URL fallback:", error);
    // Fallback: open primary URL anyway
    if (target === "_blank") {
      window.open(PRIMARY_URL, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = PRIMARY_URL;
    }
  }
}

/**
 * Clear cache for a specific URL (useful when server status changes)
 */
export function clearUrlCache(url?: string) {
  if (url) {
    delete urlCache[url];
  } else {
    urlCache = {};
  }
}

/**
 * Quick fallback mechanism - checks availability and opens the best URL
 * This is the recommended handler for external links
 * Checks both URLs in parallel and opens the available one
 */
export async function handleQuickUrlClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const target = (e.currentTarget as HTMLAnchorElement).target;

  // Clear cache to ensure fresh check (server might have been restarted)
  clearUrlCache();

  // Check both URLs in parallel for faster response
  const [primaryCheck, fallbackCheck] = await Promise.allSettled([
    Promise.race([
      isUrlReachable(PRIMARY_URL),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), TIMEOUT_MS))
    ]),
    Promise.race([
      isUrlReachable(FALLBACK_URL),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), TIMEOUT_MS))
    ])
  ]);

  // Determine which URL to open
  const primaryAvailable = primaryCheck.status === "fulfilled" && primaryCheck.value === true;
  const fallbackAvailable = fallbackCheck.status === "fulfilled" && fallbackCheck.value === true;

  let urlToOpen: string;
  
  // Priority: primary if available, else fallback if available, else primary (let browser show error)
  if (primaryAvailable) {
    urlToOpen = PRIMARY_URL;
  } else if (fallbackAvailable) {
    urlToOpen = FALLBACK_URL;
    console.log(`Primary URL (${PRIMARY_URL}) is unavailable, using fallback (${FALLBACK_URL})`);
  } else {
    // Both unavailable, try primary and let browser handle the error
    urlToOpen = PRIMARY_URL;
    console.warn(`Both URLs appear unavailable, trying primary (${PRIMARY_URL})`);
  }

  // Open the determined URL
  if (target === "_blank") {
    const openedWindow = window.open(urlToOpen, "_blank", "noopener,noreferrer");
    
    // Additional safety check: if we opened primary but it's actually down,
    // verify after a short delay and open fallback if needed
    if (urlToOpen === PRIMARY_URL && !primaryAvailable && fallbackAvailable) {
      setTimeout(async () => {
        // Double-check primary (fresh check, no cache)
        clearUrlCache(PRIMARY_URL);
        const doubleCheck = await Promise.race([
          isUrlReachable(PRIMARY_URL),
          new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 2000))
        ]);
        
        if (!doubleCheck && fallbackAvailable) {
          console.log(`Primary URL still unavailable, switching to fallback`);
          try {
            if (openedWindow && !openedWindow.closed) {
              openedWindow.close();
            }
          } catch (e) {
            // Can't close due to browser security, that's ok
          }
          window.open(FALLBACK_URL, "_blank", "noopener,noreferrer")?.focus();
        }
      }, 3000);
    }
  } else {
    window.location.href = urlToOpen;
  }
}

