const STORAGE_KEY = "expenses";

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function loadExpenses() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];

  try {
    const expenses = JSON.parse(raw);
    return Array.isArray(expenses) ? expenses : [];
  } catch {
    return [];
  }
}
