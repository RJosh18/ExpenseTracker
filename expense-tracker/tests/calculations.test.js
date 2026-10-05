import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  calculateTotal,
  filterByMonth,
  getCategoryTotals,
  todayString,
} from "../src/utils/calculations.js";

describe("calculations", () => {
  it("sums expense amounts", () => {
    expect(calculateTotal([{ amount: 12.5 }, { amount: 7.5 }])).toBe(20);
    expect(calculateTotal([])).toBe(0);
  });

  it("groups amounts by category", () => {
    expect(
      getCategoryTotals([
        { category: "Food", amount: 12 },
        { category: "Transport", amount: 8 },
        { category: "Food", amount: 3 },
      ]),
    ).toEqual({ Food: 15, Transport: 8 });
  });

  it("treats the input month as 1-based", () => {
    const expenses = [
      { date: "2025-01-15", amount: 10 },
      { date: "2025-02-15", amount: 20 },
      { date: "2025-12-15", amount: 30 },
    ];

    expect(filterByMonth(expenses, 2025, 1)).toEqual([expenses[0]]);
    expect(filterByMonth(expenses, 2025, 12)).toEqual([expenses[2]]);
  });

  describe("in the Melbourne timezone", () => {
    let originalTimezone;

    beforeAll(() => {
      originalTimezone = process.env.TZ;
      process.env.TZ = "Australia/Melbourne";
    });

    afterAll(() => {
      if (originalTimezone === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = originalTimezone;
      }
      vi.useRealTimers();
    });

    it("returns the current Melbourne calendar date", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-01-01T13:30:00.000Z"));

      expect(todayString()).toBe("2025-01-02");
    });
  });
});
