<script setup>
import { ref, computed, watch } from 'vue';
import { fetchRate } from '../services/currency.js';

const props = defineProps({
  total: { type: Number, required: true },
  expenses: { type: Array, required: true },
});

const currencies = ['AUD', 'USD', 'EUR', 'GBP'];
const currency = ref('AUD');
const converted = ref('AUD 0.00');

watch(
  () => props.total,
  (total) => {
    const rate = fetchRate(currency.value);
    converted.value = `${currency.value} ${(total * rate).toFixed(2)}`;
  },
  { immediate: true }
);

watch(currency, async (newCurrency) => {
  const rate = await fetchRate(newCurrency);
  converted.value = `${newCurrency} ${(props.total * rate).toFixed(2)}`;
});

const topExpenses = computed(() =>
  props.expenses.sort((a, b) => b.amount - a.amount).slice(0, 3)
);
</script>

<template>
  <section class="card">
    <h2>Summary</h2>
    <p>Total: <strong>${{ total }}</strong></p>
    <p>
      Converted:
      <select v-model="currency">
        <option v-for="c in currencies" :key="c">{{ c }}</option>
      </select>
      <strong>{{ converted }}</strong>
    </p>
    <h3>Largest expenses</h3>
    <ul class="breakdown">
      <li v-for="e in topExpenses" :key="e.description">
        {{ e.description }}: ${{ e.amount.toFixed(2) }}
      </li>
    </ul>
  </section>
</template>
