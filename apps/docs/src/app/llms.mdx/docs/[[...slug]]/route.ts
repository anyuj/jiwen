import { notFound } from "next/navigation";
import { i18n } from "@/lib/i18n";
import { getLLMText, getPageMarkdownUrl, source } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/docs/[[...slug]]">,
) {
  const { slug } = await params;
  if (!slug || slug[slug.length - 1] !== "content.md") notFound();

  const segments = slug.slice(0, -1);
  const locale = i18n.languages.find((language) => language === segments[0]);
  if (!locale) notFound();

  const slugs = segments.slice(1);
  const page = source.getPage(slugs, locale);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    locale: page.locale,
    slug: getPageMarkdownUrl(page).segments,
  }));
}
