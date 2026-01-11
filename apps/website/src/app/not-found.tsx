import ErrorPage from "@/components/errors/error-page";
import { ERROR_TYPE } from "@/lib/types/errors";

export default function NotFound() {
  const notFoundError = new Error("Page not found");

  return (
    <ErrorPage
      error={notFoundError}
      errorType={ERROR_TYPE.NOT_FOUND}
      statusCode={404}
      showBrowseDestinations={true}
    />
  );
}
