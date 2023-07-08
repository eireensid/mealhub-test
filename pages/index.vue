<template>
  <table>
    <thead>
        <tr>
            <th @click="sort">id</th>
            <th>name</th>
            <th>email</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="comment in data" :key="comment.id">
            <td>{{comment.id}}</td>
            <td>{{comment.name}}</td>
            <td>{{comment.email}}</td>
        </tr>
    </tbody>
</table>
</template> 

<script setup>
  const { data, error } = await useFetch('https://jsonplaceholder.typicode.com/comments?_page=1')
  const isIdsAsc = ref(true)

  const sort = () => {
    data.value.sort((comment1, comment2) => {
      return isIdsAsc.value ? comment2.id - comment1.id : comment1.id - comment2.id
    })

    isIdsAsc.value = !isIdsAsc.value
  }
</script>