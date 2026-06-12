import { createMiddleware } from "@tanstack/react-start";
import {
  getResponseHeaders,
  setResponseHeaders,
} from "@tanstack/react-start/server";

export const securityMiddleware = createMiddleware().server(({ next }) => {
  const headers = getResponseHeaders();

  headers.set("Referrer-Policy", "origin-when-cross-origin");
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");

  setResponseHeaders(headers);

  return next();
});
