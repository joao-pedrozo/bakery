<template>
  <h1>Welcome to Bakery App</h1>
</template>

<script setup lang="ts">
import type { Cake } from "~/types";

const { fetchCakes } = useApi();
const cakes = ref<Cake[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
</script>

<style scoped>
h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

h2 {
  color: #34495e;
  margin: 2rem 0 1rem 0;
}

p {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.error {
  color: #e74c3c;
  background: #fdf2f2;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background: #2980b9;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f8f9fa;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

li strong {
  color: #2c3e50;
}
</style>
