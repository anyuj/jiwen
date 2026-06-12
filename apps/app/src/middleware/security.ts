import { createMiddleware } from "@tanstack/react-start";
import {
  getResponseHeaders,
  setResponseHeaders,
} from "@tanstack/react-start/server";

export const securityMiddleware = createMiddleware().server(({ next }) => {
  const headers = getResponseHeaders();
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const connectSrc = [].filter(Boolean);
  const csp = `
    object-src 'none';
    script-src 'nonce-${nonce}' 'unsafe-inline' 'strict-dynamic' https: http:;
    connect-src 'self' ${connectSrc.join(" ")};
    style-src 'self' 'unsafe-inline';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${import.meta.env.PROD ? "upgrade-insecure-requests;" : ""}
  `;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = csp.replace(/\s{2,}/g, " ").trim();

  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-DNS-Prefetch-Control", "on");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  // TODO: Uncomment this when we are ready to enforce the CSP
  // headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
  headers.set(
    "Content-Security-Policy-Report-Only",
    contentSecurityPolicyHeaderValue,
  );
  setResponseHeaders(headers);

  return next({
    context: {
      nonce,
    },
  });
});
