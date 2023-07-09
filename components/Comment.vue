<template>
  <div v-if="comment">
    <h1>Комментарий <span class="number">{{ comment.id }}</span></h1>
    <div class="block">
      <div class="row">
        <span class="label">Имя</span>
        <span class="info">{{ comment.name }}</span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="info">{{ comment.email }}</span>
      </div>
      <div class="row">
        <span class="label">Комментарий</span>
        <span class="info">{{ comment.body }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute()
  const url = `${API_URL}/comments/${route.params.id}`
  const comment = await fetch(url)
    .then(resp => {
      return resp.json()
    })
    .catch((error) => error.data)
</script>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1000px;
}
.row {
  display: flex;
  flex-direction: column;
}
.label {
  text-transform: uppercase;
}
.info {
  font-weight: 500;
  font-size: 1.1em;
}
.number {
  color: #535bf2;
}
</style>