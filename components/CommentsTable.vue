<template>
  <div v-if="comments">
    <h1>Список комментариев</h1>
    <div class="table">
      <div class="row">
        <div class="sort col" @click="sortComments('change')">
          <span class="head">id</span>
          <nuxt-icon class="sort-ico" name="sort-icon" />
        </div>
        <span class="head col">name</span>
        <span class="head col">email</span>
      </div>
      <NuxtLink v-for="comment in comments" :key="comment.id" class="row" :to="`comments/${comment.id}`">
        <span class="center col">{{comment.id}}</span>
        <span class="col">{{comment.name}}</span>
        <span class="col">{{comment.email}}</span>
      </NuxtLink>
    </div>
    <div class="pagination">
      <vue-awesome-paginate
        :total-items="totalComments"
        :items-per-page="limit"
        :max-pages-shown="5"
        v-model="page"
        :on-click="refetchComments"
      />
    </div>
  </div>
</template>

<script setup>
  const page = ref(1)
  const totalComments = ref(0)
  const isIdsAsc = ref(true)
  const comments = ref(null)
  const limit = 15

  const fetchComments = async () => {
    const url = `${API_URL}/comments?_page=${page.value}&_limit=${limit}`
    comments.value = await fetch(url)
      .then(resp => {
        totalComments.value = Math.ceil(+(resp.headers.get('x-total-count')))
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
    window.scrollTo(0,0)
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

<style scoped>
.table {
  border: 1px solid #213547;
  border-radius: 8px;
}
.row {
  display: grid;
  grid-template-columns: 60px 2fr 1fr;
}
.row:not(:last-child) {
  border-bottom: 1px solid #213547;
}
.col {
  padding: 8px;
}
.col:not(:last-child) {
  border-right: 1px solid #213547;
}
.head {
  font-weight: 700;
  transition: color .25s;
  text-transform: uppercase;
  text-align: center;
}
.center {
  text-align: center;
}
.sort {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.sort:hover .head {
  color: #535bf2;
}
.sort-ico {
  width: 16px;
  color: #535bf2;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>