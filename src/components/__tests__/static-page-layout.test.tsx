import { render, screen } from "@testing-library/react";
import { StaticPageLayout } from "../static-page-layout";

describe("StaticPageLayout component", () => {
  it("should render children with correct layout structure", () => {
    render(
      <StaticPageLayout>
        <h1>Test Title</h1>
        <p>Test content</p>
      </StaticPageLayout>
    );

    // Check that the main container has correct classes
    const container = screen.getByRole("article").parentElement;
    expect(container).toHaveClass(
      "mx-auto",
      "max-w-4xl",
      "bg-white",
      "px-4",
      "py-16",
      "sm:px-6",
      "lg:px-8"
    );

    // Check that the article has correct classes
    const article = screen.getByRole("article");
    expect(article).toHaveClass("prose", "prose-lg", "max-w-none");

    // Check that children are rendered
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render complex children structure", () => {
    render(
      <StaticPageLayout>
        <div>
          <h1>Complex Title</h1>
          <section>
            <h2>Section Title</h2>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </section>
        </div>
      </StaticPageLayout>
    );

    expect(screen.getByText("Complex Title")).toBeInTheDocument();
    expect(screen.getByText("Section Title")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("should render empty children", () => {
    render(<StaticPageLayout>{null}</StaticPageLayout>);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toBeEmptyDOMElement();
  });

  it("should render with multiple children", () => {
    render(
      <StaticPageLayout>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </StaticPageLayout>
    );

    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
    expect(screen.getByText("Third child")).toBeInTheDocument();
  });
});
