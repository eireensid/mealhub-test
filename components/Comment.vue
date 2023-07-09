<template>
  <div>
    <p>{{ comment.name }}</p>
    <p>{{ comment.email }}</p>
    <p>{{ comment.body }}</p>
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