<script setup>
import { ref } from "vue";
import { todayString } from "../utils/calculations.js";

const emit = defineEmits(["add"]);

const categories = ["Food", "Transport", "Bills", "Entertainment", "Other"];

const description = ref("");
const amount = ref("");
const category = ref("Food");
const date = ref(todayString());

function submit() {
  const normalizedDescription = description.value.trim();
  if (!normalizedDescription) return;

  emit("add", {
    description: normalizedDescription,
    amount: parseFloat(amount.value),
    category: category.value,
    date: date.value,
  });
  description.value = "";
  amount.value = "";
  category.value = "Food";
  date.value = todayString();
}
</script>

<template>
  <section class="card">
    <h2>Add expense</h2>
    <form @submit.prevent="submit">
      <label
        >Description
        <input
          v-model="description"
          type="text"
          required
          placeholder="e.g. Coffee"
        />
      </label>
      <label
        >Amount (AUD)
        <input
          v-model="amount"
          type="number"
          step="0.01"
          min="0"
          required
          placeholder="0.00"
        />
      </label>
      <label
        >Category
        <select v-model="category">
          <option v-for="c in categories" :key="c">{{ c }}</option>
        </select>
      </label>
      <label
        >Date
        <input v-model="date" type="date" required />
      </label>
      <button type="submit">Add</button>
    </form>
  </section>
</template>
