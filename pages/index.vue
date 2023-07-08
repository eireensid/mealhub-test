<template>
  <table v-if="comments">
    <thead>
        <tr>
            <th @click="sort">id</th>
            <th>name</th>
            <th>email</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="comment in comments" :key="comment.id">
            <td>{{comment.id}}</td>
            <td>{{comment.name}}</td>
            <td>{{comment.email}}</td>
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
    const url = `https://jsonplaceholder.typicode.com/comments?_page=${page.value}&_limit=${limit}`
    comments.value = await fetch(url)
      .then(resp => {
        totalPages.value = Math.ceil(+(resp.headers.get('x-total-count')) / limit)
        return resp.json()
      })
      .catch((error) => error.data)
  } 

  fetchComments()

  const refetchComments = async pageNumber => {
    page.value = pageNumber
    fetchComments()
  } 

  const sort = () => {
    comments.value.sort((comment1, comment2) => {
      return isIdsAsc.value ? comment2.id - comment1.id : comment1.id - comment2.id
    })

    isIdsAsc.value = !isIdsAsc.value
  }
</script>