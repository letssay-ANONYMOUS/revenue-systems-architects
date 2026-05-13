import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import Index from "@/pages/Index";

const originalInnerWidth = window.innerWidth;
const originalMatchMedia = window.matchMedia;

beforeAll(() => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
  window.matchMedia = (query: string) => ({
    matches: query.includes("pointer: fine"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
  window.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof window.IntersectionObserver;
});

afterAll(() => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: originalInnerWidth });
  window.matchMedia = originalMatchMedia;
});

describe("website carousel expand preview", () => {
  it("opens the full website preview from the expand button", async () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /expand real estate website preview/i }));

    expect(
      await screen.findByRole("dialog", { name: /real estate full website preview/i })
    ).toBeInTheDocument();
  });
});
