<template>
  <div v-if="comments">
    <h1>Список комментариев</h1>
    <div class="table">
      <div class="row">
        <div class="sort" @click="sortComments('change')">
          <span class="head">id</span>
          <svg class="sort-ico" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g>
              <path d="M100.36,229.07h311.31c23.25,0,35.6-27.51,20.14-44.89L276.15,9.06c-10.69-12.08-29.57-12.08-40.26,0L80.19,184.18
                C64.74,201.55,77.08,229.07,100.36,229.07z M235.87,502.94c10.69,12.08,29.57,12.08,40.26,0l155.65-175.09
                c15.48-17.38,3.13-44.86-20.14-44.86H100.36c-23.25,0-35.6,27.49-20.14,44.89L235.87,502.94z" fill="currentColor"/>
            </g>
          </svg>
        </div>
        <span class="head">name</span>
        <span class="head">email</span>
      </div>
      <NuxtLink v-for="comment in comments" :key="comment.id" class="row" :to="`comments/${comment.id}`">
        <span class="center">{{comment.id}}</span>
        <span>{{comment.name}}</span>
        <span>{{comment.email}}</span>
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
.row {
  display: grid;
  grid-template-columns: 40px 2fr 1fr;
  grid-gap: 40px;
}
.head {
  font-weight: 700;
  transition: color .25s;
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