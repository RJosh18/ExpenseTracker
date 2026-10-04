<script setup>
defineProps({
  expenses: { type: Array, required: true },
});

const emit = defineEmits(['delete']);
</script>

<template>
  <section class="card">
    <h2>Expenses</h2>
    <p v-if="expenses.length === 0" class="meta">No expenses yet.</p>
    <ul class="expense-list">
      <li v-for="(e, index) in expenses" :key="index">
        <div>
          <div v-html="e.description"></div>
          <div class="meta">{{ e.category }} · {{ e.date }}</div>
        </div>
        <div>
          ${{ e.amount.toFixed(2) }}
          <button class="delete" @click="emit('delete', index)">✕</button>
        </div>
      </li>
    </ul>
  </section>
</template>
