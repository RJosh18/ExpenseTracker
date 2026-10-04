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
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

export function todayString() {
  return new Date().toISOString().slice(0, 10);
}
