import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";

import { SearchForm } from "../search-form";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("@repo/ui", () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
  Label: ({
    children,
    ...props
  }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props}>{children}</label>
  ),
  CountryCombobox: ({
    id,
    value,
    onValueChange,
  }: {
    id: string;
    value: string;
    onValueChange: (val: string) => void;
  }) => (
    <select
      data-testid={id}
      id={id}
      value={value}
      onChange={e => onValueChange(e.target.value)}
    >
      <option value="">Select</option>
      <option value="US">United States</option>
      <option value="AE">United Arab Emirates</option>
      <option value="EG">Egypt</option>
    </select>
  ),
}));

describe("SearchForm funnel navigation", () => {
  const defaultProps = {
    countries: [
      { code: "US", localizedName: "United States" },
      { code: "AE", localizedName: "United Arab Emirates" },
      { code: "EG", localizedName: "Egypt" },
    ],
    searchTitle: "Check Visa Requirements",
    passportLabel: "Passport",
    passportPlaceholder: "Select passport",
    destinationLabel: "Destination",
    destinationPlaceholder: "Select destination",
    checkButtonText: "Check Eligibility",
    emptyText: "Not found",
    searchPlaceholder: "Search",
  };

  beforeEach(() => {
    mockPush.mockClear();
    window.localStorage.clear();
    document.cookie =
      "gtv_passport=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.documentElement.lang = "en";
  });

  it("navigates directly to /[locale]/d/[destination]/p/[passport] and persists sticky passport cookie when submitted", () => {
    render(<SearchForm {...defaultProps} />);

    fireEvent.change(screen.getByTestId("passport-combobox"), {
      target: { value: "EG" },
    });
    fireEvent.change(screen.getByTestId("destination-combobox"), {
      target: { value: "AE" },
    });

    const form = screen
      .getByRole("button", { name: "Check Eligibility" })
      .closest("form");
    if (!form) {
      throw new Error("Expected form element");
    }
    fireEvent.submit(form);

    expect(window.localStorage.getItem("gtv_passport")).toBe("EG");
    expect(document.cookie).toContain("gtv_passport=EG");
    expect(mockPush).toHaveBeenCalledWith("/en/d/ae/p/eg");
  });
});
