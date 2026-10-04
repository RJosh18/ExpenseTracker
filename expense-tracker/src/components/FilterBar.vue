<script setup>
const category = defineModel('category');
const month = defineModel('month');

const categories = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'];
</script>

<template>
  <section class="card">
    <h2>Filters</h2>
    <div class="row">
      <label>Category
        <select v-model="category">
          <option v-for="c in categories" :key="c">{{ c }}</option>
        </select>
      </label>
      <label>Month
        <input v-model="month" type="month" />
      </label>
    </div>
  </section>
</template>
