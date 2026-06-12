import { stopwords as mandarinStopwords } from "@orama/stopwords/mandarin";
import { createTokenizer as mandarinTokenizer } from "@orama/tokenizers/mandarin";
import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  localeMap: {
    zh: {
      components: {
        tokenizer: mandarinTokenizer({
          stopWords: mandarinStopwords,
          language: "mandarin",
        }),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
    en: { language: "english" },
  },
});
