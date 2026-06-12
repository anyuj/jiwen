import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { i18n } from "@/lib/i18n";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const i18nMiddleware = createI18nMiddleware(i18n);

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}/${i18n.defaultLanguage}{/*path}/content.md`,
);

const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.mdx`,
  `${docsContentRoute}/${i18n.defaultLanguage}{/*path}/content.md`,
);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const suffixResult = rewriteSuffix(request.nextUrl.pathname);

  if (suffixResult) {
    return NextResponse.rewrite(new URL(suffixResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const docsResult = rewriteDocs(request.nextUrl.pathname);

    if (docsResult) {
      return NextResponse.rewrite(new URL(docsResult, request.nextUrl));
    }
  }

  return i18nMiddleware(request, event);
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and generated asset routes.
  // You may need to adjust it to ignore static assets in `/public` folder
  matcher: [
    "/((?!api|og|llms\\.mdx/docs|llms\\.txt|llms-full\\.txt|_next/static|_next/image|favicon.ico).*)",
  ],
};
