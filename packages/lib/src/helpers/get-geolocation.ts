export function getCountry(request: Request) {
  return request.headers.get("ali-ip-country") || "Unknown";
}

export function getCity(request: Request) {
  return request.headers.get("ali-ip-city") || "Unknown";
}

export function getGeolocation(request: Request) {
  return {
    country: getCountry(request),
    city: getCity(request),
  };
}
