import { createCsrfMiddleware } from "@tanstack/react-start";

export const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
  origin: [
    "https://app.jiwen.net",
    "https://app.jiwen.localhost", // for development
  ],
});
