import { createStart } from "@tanstack/react-start";
import { csrfMiddleware } from "@/middleware/csrf";
import { securityMiddleware } from "@/middleware/security";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [csrfMiddleware, securityMiddleware],
  };
});
