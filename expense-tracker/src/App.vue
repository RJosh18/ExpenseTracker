<script setup>
import { ref, computed } from 'vue';
import { useExpenses } from './composables/useExpenses.js';
import { calculateTotal, filterByMonth } from './utils/calculations.js';
import ExpenseForm from './components/ExpenseForm.vue';
import FilterBar from './components/FilterBar.vue';
import SummaryCard from './components/SummaryCard.vue';
import ExpenseList from './components/ExpenseList.vue';

const { expenses, addExpense, removeExpense } = useExpenses();

const categoryFilter = ref('All');
const monthFilter = ref('');

const visibleExpenses = computed(() => {
  let result = expenses.value.filter(
    (e) => categoryFilter.value === 'All' || e.category === categoryFilter.value
  );
  if (monthFilter.value) {
    const [year, month] = monthFilter.value.split('-').map(Number);
    result = filterByMonth(result, year, month);
  }
  return result;
});

const total = computed(() => calculateTotal(visibleExpenses.value));
</script>

<template>
  <main class="container">
    <h1>Expense Tracker</h1>
    <div class="layout">
      <div class="col-left">
        <ExpenseForm @add="addExpense" />
        <SummaryCard :total="total" :expenses="expenses" />
      </div>
      <div class="col-right">
        <FilterBar v-model:category="categoryFilter" v-model:month="monthFilter" />
        <ExpenseList :expenses="visibleExpenses" @delete="removeExpense" />
      </div>
    </div>
  </main>
</template>
