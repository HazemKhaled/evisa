import ErrorPage from "@/components/errors/error-page";
import { ErrorType } from "@/lib/types/errors";

export default function NotFound() {
  const notFoundError = new Error("Page not found");

  return (
    <ErrorPage
      error={notFoundError}
      errorType={ErrorType.NOT_FOUND}
      statusCode={404}
      showBrowseDestinations={true}
    />
  );
}
