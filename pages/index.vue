<template>
  <table v-if="comments">
    <thead>
        <tr>
            <th @click="sortComments('change')">id</th>
            <th>name</th>
            <th>email</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="comment in comments" :key="comment.id">
            <NuxtLink :to="`comments/${comment.id}`">
              <td>{{comment.id}}</td>
              <td>{{comment.name}}</td>
              <td>{{comment.email}}</td>
            </NuxtLink>
        </tr>
    </tbody>
  </table>
  <pagination @change="refetchComments" :totalPages="totalPages" :currentPage="page" />
</template> 

<script setup>
  const page = ref(1)
  const totalPages = ref(0)
  const isIdsAsc = ref(true)
  const comments = ref(null)

  const fetchComments = async () => {
    const limit = 15
    const url = `${API_URL}/comments?_page=${page.value}&_limit=${limit}`
    comments.value = await fetch(url)
      .then(resp => {
        totalPages.value = Math.ceil(+(resp.headers.get('x-total-count')) / limit)
        return resp.json()
      })
      .catch((error) => error.data)
  } 

  fetchComments()

  const refetchComments = pageNumber => {
    page.value = pageNumber
    fetchComments().then(() => {
      sortComments('init')
    })
  } 

  const sortComments = (mode) => {
    if (mode === 'init') {
      comments.value.sort((comment1, comment2) => {
        return isIdsAsc.value ? comment1.id - comment2.id : comment2.id - comment1.id
      })
    } else if (mode === 'change') {
      comments.value.sort((comment1, comment2) => {
        return isIdsAsc.value ? comment2.id - comment1.id : comment1.id - comment2.id
      })

      isIdsAsc.value = !isIdsAsc.value
    }
  }
</script>