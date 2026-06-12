export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const getUrlFromString = (str: string) => {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_) {}
  return str;
};

export const getSearchParams = (url: string) => {
  const params = {} as Record<string, string>;

  new URL(url).searchParams.forEach((val, key) => {
    params[key] = val;
  });

  return params;
};

export function createUrl(url: string): URL | null {
  const encodedUrl = encodeURI(url);
  try {
    return new URL(encodedUrl);
  } catch {
    return null;
  }
}
