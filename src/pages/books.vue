<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          hide-details
          label="Search by title"
          :loading="isLoading"
          single-line
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="author"
          append-icon="mdi-magnify"
          hide-details
          label="Search by author"
          :loading="isLoadingAuthor"
          single-line
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book.title"
        cols="12"
        md="3"
      >
        <Book :book="book" />
      </v-col>
    </v-row>
    <v-row>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="Math.ceil(totalBooks/perPage)"
          :total-visible="10"
        />
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import axios from 'axios'
  import Book from '../components/Book'
  //import NewForm from '../components/NewForm.vue'

  const books = ref([])
  const page = ref(1)
  const perPage = 20
  const totalBooks = ref(0)

  const search = ref('')
  const author = ref('')

  const isLoading = ref(false)
  const isLoadingAuthor = ref(false)
  let searchTimerId = null

  const getData = async () => {
    isLoading.value = true
    isLoadingAuthor.value = true
    let q = search.value || ''
    if (author.value) {
      q += `+author:${author.value}`
    }
    const api = 'https://openlibrary.org/search.json'
    try {
      const response = await axios.get(api, {
        params: {
          q,
          page: page.value,
          limit: perPage,
        },
      })
      books.value = response.data.docs.map(doc => ({
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
      }))
      totalBooks.value = response.data.numFound
      isLoading.value = false
      isLoadingAuthor.value = false
    } catch (error) {
      isLoading.value = false
      isLoadingAuthor.value = false
    }
  }

  const fetchEntriesDebounced = () => {
    clearTimeout(searchTimerId)
    searchTimerId = setTimeout(() => {
      getData()
    }, 500)
  }

  const searchEntries = () => {
    books.value = []
    page.value = 1
    fetchEntriesDebounced()
  }

  onMounted(() => {
    getData()
  })

  watch(page, () => {
    getData()
  })

  watch(search, val => {
    if (!val) return
    isLoading.value = true
    searchEntries()
  })

  watch(author, val => {
    if (!val) return
    isLoadingAuthor.value = true
    searchEntries()
  })
</script>
