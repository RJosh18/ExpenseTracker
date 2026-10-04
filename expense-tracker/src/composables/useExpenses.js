import { ref } from 'vue';
import { loadExpenses, saveExpenses } from '../services/storage.js';

const expenses = ref(loadExpenses());

export function useExpenses() {
  function addExpense(expense) {
    expenses.value.push(expense);
    saveExpenses(expenses.value);
  }

  function removeExpense(index) {
    expenses.value.splice(index, 1);
    saveExpenses(expenses.value);
  }

  return { expenses, addExpense, removeExpense };
}
