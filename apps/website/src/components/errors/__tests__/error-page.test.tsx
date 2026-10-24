import { render, screen } from "@testing-library/react";

import { useTranslation } from "../../../app/i18n/client";
import { ERROR_TYPE } from "../../../lib/types/errors";
import ErrorPage from "../error-page";

let mockLocale = "en";

jest.mock("next/navigation", () => ({
  useParams: () => ({ locale: mockLocale }),
}));

jest.mock("../../../lib/errors/utils", () => ({
  classifyError: jest.requireActual("../../../lib/errors/utils").classifyError,
  logError: jest.fn(),
}));

/**
 * Resolves a translation key against the real locale catalogues, mirroring the
 * fallback behaviour configured in `app/i18n/settings.ts` (English fallback).
 * A missing namespace or key resolves to the key itself, exactly like i18next,
 * so an inverted `useTranslation(lng, ns)` call surfaces as raw keys on screen.
 */
jest.mock("../../../app/i18n/client", () => {
  const load = (path: string): Record<string, unknown> => {
    const loaded: Record<string, unknown> & {
      default?: Record<string, unknown>;
    } = jest.requireActual(path);
    return loaded.default ?? loaded;
  };

  const catalogues: Record<string, Record<string, unknown>> = {
    en: { common: load("../../../../public/locales/en/common.json") },
    ar: { common: load("../../../../public/locales/ar/common.json") },
  };

  const lookup = (locale: string, namespace: string, key: string) => {
    const read = (catalogue: unknown, path: string): unknown =>
      path
        .split(".")
        .reduce<unknown>(
          (node, part) =>
            node && typeof node === "object"
              ? (node as Record<string, unknown>)[part]
              : undefined,
          catalogue
        );

    return (
      read(catalogues[locale]?.[namespace], key) ??
      read(catalogues.en[namespace], key) ??
      key
    );
  };

  return {
    useTranslation: jest.fn((locale: string, namespace = "common") => ({
      t: (key: string) => lookup(locale, namespace, key),
    })),
  };
});

const mockedUseTranslation = useTranslation as jest.MockedFunction<
  typeof useTranslation
>;

describe("ErrorPage", () => {
  beforeEach(() => {
    mockLocale = "en";
    mockedUseTranslation.mockClear();
  });

  it("renders the English not-found copy from common.json", () => {
    render(
      <ErrorPage
        error={new Error("not found")}
        statusCode={404}
        reset={jest.fn()}
      />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Page Not Found" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you're looking for doesn't exist or has been moved."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
    expect(screen.getByText("Go Home")).toBeInTheDocument();
  });

  it("requests the common namespace for the active locale", () => {
    mockLocale = "ar";

    render(<ErrorPage error={new Error("boom")} reset={jest.fn()} />);

    expect(mockedUseTranslation).toHaveBeenCalledWith("ar", "common");
  });

  it("renders Arabic error copy and actions instead of raw keys", () => {
    mockLocale = "ar";

    render(
      <ErrorPage
        error={new Error("boom")}
        errorType={ERROR_TYPE.UNKNOWN_ERROR}
        reset={jest.fn()}
      />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "حدث خطأ ما" })
    ).toBeInTheDocument();
    expect(screen.getByText("حاول مرة أخرى")).toBeInTheDocument();
    expect(screen.getByText("العودة للرئيسية")).toBeInTheDocument();
    expect(screen.queryByText(/^errors\./)).not.toBeInTheDocument();
  });

  it("falls back to English copy for keys missing from the Arabic catalogue", () => {
    mockLocale = "ar";

    render(
      <ErrorPage
        error={new Error("not found")}
        errorType={ERROR_TYPE.NOT_FOUND}
        reset={jest.fn()}
      />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Page Not Found" })
    ).toBeInTheDocument();
    expect(screen.queryByText(/^errors\./)).not.toBeInTheDocument();
  });
});
