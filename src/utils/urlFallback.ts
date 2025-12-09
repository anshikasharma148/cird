/**
 * Utility functions for URL fallback mechanism
 * Tries primary URL first, falls back to secondary URL if primary is unreachable
 */

const PRIMARY_URL = "http://115.242.156.230:3000";
const FALLBACK_URL = "http://115.242.156.230:4000";
const TIMEOUT_MS = 2000; // 2 second timeout for quick checks

// Cache for URL availability checks (to avoid repeated checks)
let urlCache: { [key: string]: { available: boolean; timestamp: number } } = {};
const CACHE_DURATION = 30000; // Cache for 30 seconds

/**
 * Check if a URL is reachable using fetch with timeout
 */
async function isUrlReachable(url: string): Promise<boolean> {
  // Check cache first
  const cached = urlCache[url];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.available;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    // Use fetch with no-cors mode to avoid CORS issues
    // Even if CORS fails, a response means the server is reachable
    const response = await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal,
      cache: "no-cache",
    });

    clearTimeout(timeoutId);
    
    // Cache the result
    urlCache[url] = { available: true, timestamp: Date.now() };
    return true;
  } catch (error) {
    // URL is not reachable
    urlCache[url] = { available: false, timestamp: Date.now() };
    return false;
  }
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
 * Quick fallback mechanism - checks availability and opens the best URL
 * This is the recommended handler for external links
 * Checks both URLs in parallel and opens the available one
 */
export async function handleQuickUrlClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const target = (e.currentTarget as HTMLAnchorElement).target;

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
  const primaryAvailable = primaryCheck.status === "fulfilled" && primaryCheck.value;
  const fallbackAvailable = fallbackCheck.status === "fulfilled" && fallbackCheck.value;

  let urlToOpen = PRIMARY_URL; // Default to primary
  if (primaryAvailable) {
    urlToOpen = PRIMARY_URL;
  } else if (fallbackAvailable) {
    urlToOpen = FALLBACK_URL;
  } else {
    // If both checks failed or timed out, try primary first
    // Browser will show its own error if it's down
    urlToOpen = PRIMARY_URL;
  }

  // Open the determined URL
  if (target === "_blank") {
    const openedWindow = window.open(urlToOpen, "_blank", "noopener,noreferrer");
    
    // If we opened primary but it might be down, check again and open fallback if needed
    if (urlToOpen === PRIMARY_URL && !primaryAvailable && fallbackAvailable) {
      setTimeout(async () => {
        const doubleCheck = await Promise.race([
          isUrlReachable(PRIMARY_URL),
          new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 1500))
        ]);
        
        if (!doubleCheck && fallbackAvailable) {
          try {
            if (openedWindow && !openedWindow.closed) {
              openedWindow.close();
            }
          } catch (e) {
            // Can't close, that's ok
          }
          window.open(FALLBACK_URL, "_blank", "noopener,noreferrer")?.focus();
        }
      }, 2000);
    }
  } else {
    window.location.href = urlToOpen;
  }
}

