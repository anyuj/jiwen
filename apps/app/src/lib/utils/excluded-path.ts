const EXCLUDED_PATH_PATTERN = /^\/(?:api|monitoring)(?:\/|$)/;

export const EXCLUDED_PATH_PREFIXES = ["/api", "/monitoring"] as const;

export function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATH_PATTERN.test(pathname);
}
