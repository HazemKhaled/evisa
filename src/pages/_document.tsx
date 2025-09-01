import { Html, Head, Main, NextScript } from "next/document";
import { getTextDirection } from "@/lib/utils";

export default function Document(props: { __NEXT_DATA__: { locale: string } }) {
  const { locale } = props.__NEXT_DATA__;
  const direction = getTextDirection(locale || "en");

  return (
    <Html lang={locale} dir={direction}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
