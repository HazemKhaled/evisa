import { fireEvent, render, screen } from "@testing-library/react";

import { CountryPillList } from "../country-pill-list";

const buildCountries = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const code = String.fromCharCode(65 + index) + "A";
    return { code, label: `🇦🇦 ${code} Country` };
  });

describe("CountryPillList", () => {
  it("renders every country when the list fits within the visible limit", () => {
    render(
      <CountryPillList
        countries={buildCountries(3)}
        tone="green"
        moreLabel="more"
        lessLabel="Show less"
      />
    );

    expect(screen.getByText("🇦🇦 AA Country")).toBeInTheDocument();
    expect(screen.getByText("🇦🇦 CA Country")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("collapses the overflow behind a +N more button", () => {
    render(
      <CountryPillList
        countries={buildCountries(15)}
        tone="green"
        moreLabel="more"
        lessLabel="Show less"
      />
    );

    expect(screen.getAllByText(/Country$/)).toHaveLength(10);
    expect(screen.getByRole("button", { name: "+5 more" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("expands and collapses the remaining countries on demand", () => {
    render(
      <CountryPillList
        countries={buildCountries(15)}
        tone="blue"
        moreLabel="more"
        lessLabel="Show less"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "+5 more" }));

    expect(screen.getAllByText(/Country$/)).toHaveLength(15);
    expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: "Show less" }));

    expect(screen.getAllByText(/Country$/)).toHaveLength(10);
    expect(screen.getByRole("button", { name: "+5 more" })).toBeInTheDocument();
  });
});
