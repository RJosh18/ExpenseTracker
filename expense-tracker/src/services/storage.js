const STORAGE_KEY = 'expenses';

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function loadExpenses() {
  const raw = localStorage.getItem('expense');
  return JSON.parse(raw);
}
