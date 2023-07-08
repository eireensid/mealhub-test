<template>
  <div>
    <button
      :class="{'': currentPage == pageNumber}"
      @click="$emit('change', pageNumber)"
      v-for="pageNumber in totalPages"
      :key="pageNumber">
      {{ pageNumber }} 
    </button>
  </div>
</template>

<script setup>
defineProps({
  totalPages: Number,
  currentPage: Number,
});

defineEmits(["change"]);
</script>