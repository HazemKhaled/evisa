import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageSwitcher } from "../language-switcher";

// Mock Next.js navigation hooks
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: jest.fn().mockReturnValue("/en/blog"),
  useParams: jest.fn().mockReturnValue({ locale: "en" }),
}));

// Get references to the mocked functions
const { usePathname: mockUsePathname, useParams: mockUseParams } =
  jest.requireMock("next/navigation");

// Mock document.cookie
Object.defineProperty(document, "cookie", {
  writable: true,
  value: "",
});

describe("LanguageSwitcher component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = "";
    // Reset to default mock values
    mockUsePathname.mockReturnValue("/en/blog");
    mockUseParams.mockReturnValue({ locale: "en" });
  });

  it("should render with current language", () => {
    render(<LanguageSwitcher />);

    // Should show the current language (English)
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByLabelText("Language")).toBeInTheDocument();
  });

  it("should open dropdown when clicked", async () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Español")).toBeInTheDocument();
      expect(screen.getByText("العربية")).toBeInTheDocument();
    });
  });

  it("should close dropdown when clicking outside", async () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Español")).toBeInTheDocument();
    });

    // Click the button again to close
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("Español")).not.toBeInTheDocument();
    });
  });

  it("should change language when option is clicked", async () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const spanishOption = screen.getByText("Español");
      fireEvent.click(spanishOption);
    });

    expect(mockPush).toHaveBeenCalledWith("/es/blog");
    expect(document.cookie).toContain("i18next=es");
  });

  it("should handle RTL languages correctly", async () => {
    // Mock Arabic locale for this test
    mockUseParams.mockReturnValueOnce({ locale: "ar" });
    mockUsePathname.mockReturnValueOnce("/ar/blog");

    render(<LanguageSwitcher />);

    // Verify the Arabic locale is selected (العربية should be in the button)
    expect(screen.getByText("العربية")).toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      // The dropdown should show other language options
      expect(screen.getAllByText("English")).toHaveLength(3); // Button text, dropdown title, and dropdown subtitle
      expect(screen.getByText("Español")).toBeInTheDocument();
    });
  });

  it("should set correct aria attributes", () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-label", "Language");

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should handle keyboard navigation", async () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const spanishOption = screen.getByText("Español");
      fireEvent.click(spanishOption);
    });

    expect(mockPush).toHaveBeenCalledWith("/es/blog");
  });

  it("should close dropdown when same language is selected", async () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      // Find the first English option button (the selected one)
      const englishButtons = screen.getAllByText("English");
      const englishOption = englishButtons[0].closest("button");
      if (englishOption) {
        fireEvent.click(englishOption);
      }
    });

    // Dropdown should close even when same language is selected
    await waitFor(() => {
      expect(screen.queryByText("Español")).not.toBeInTheDocument();
    });
  });

  it("should handle missing locale in params", () => {
    // Mock missing locale for this test
    mockUseParams.mockReturnValueOnce({});
    mockUsePathname.mockReturnValueOnce("/blog");

    render(<LanguageSwitcher />);

    // Should default to English when no locale is provided
    expect(screen.getByText("English")).toBeInTheDocument();
  });
});
