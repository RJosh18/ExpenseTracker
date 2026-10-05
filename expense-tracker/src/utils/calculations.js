export function calculateTotal(expenses) {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function getCategoryTotals(expenses) {
  const totals = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  }
  return totals;
}

export function filterByMonth(expenses, year, month) {
  return expenses.filter((e) => {
    const [expenseYear, expenseMonth] = e.date
      .slice(0, 10)
      .split("-")
      .map(Number);
    return expenseYear === year && expenseMonth === month;
  });
}

export function todayString() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const dateParts = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}
