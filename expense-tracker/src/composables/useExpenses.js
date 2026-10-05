import { ref } from 'vue';
import { loadExpenses, saveExpenses } from '../services/storage.js';

function createExpenseId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

const expenses = ref(
  loadExpenses().map((expense) => ({
    ...expense,
    id: expense.id ?? createExpenseId(),
  })),
);

export function useExpenses() {
  function addExpense(expense) {
    expenses.value.push({ ...expense, id: expense.id ?? createExpenseId() });
    saveExpenses(expenses.value);
  }

  function removeExpense(id) {
    const index = expenses.value.findIndex((expense) => expense.id === id);
    if (index === -1) return;

    expenses.value.splice(index, 1);
    saveExpenses(expenses.value);
  }

  return { expenses, addExpense, removeExpense };
}
