/**
 * Wait for a given time
 * @param seconds - time to wait in seconds (default: 1)
 */
export const wait = (seconds: number = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
