export function calculateTotal(expenses) {
  const totalCents = expenses.reduce(
    (sum, expense) => sum + Math.round(expense.amount * 100),
    0,
  );
  return totalCents / 100;
}

export function getCategoryTotals(expenses) {
  const totalsInCents = new Map();

  for (const expense of expenses) {
    const cents =
      (totalsInCents.get(expense.category) ?? 0) +
      Math.round(expense.amount * 100);
    totalsInCents.set(expense.category, cents);
  }

  return Object.fromEntries(
    [...totalsInCents].map(([category, cents]) => [category, cents / 100]),
  );
}

export function filterByMonth(expenses, year, month) {
  return expenses.filter((expense) => {
    const [expenseYear, expenseMonth] = expense.date.split("-").map(Number);
    return expenseYear === year && expenseMonth === month;
  });
}

export function todayString() {
  const parts = new Intl.DateTimeFormat("en-AU", {
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
