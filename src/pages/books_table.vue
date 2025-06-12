<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="books.length < 11"
      :items="books"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start />

            Popular books
          </v-toolbar-title>

          <v-btn
            border
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add a Book"
            @click="add"
          />
        </v-toolbar>
      </template>

      <template #item.title="{ value }">
        <v-chip border="thin opacity-25" label prepend-icon="mdi-book" :text="value">
          <template #prepend>
            <v-icon color="medium-emphasis" />
          </template>
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)" />

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)" />
        </div>
      </template>

      <template #no-data>
        <v-btn
          border
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          @click="reset"
        />
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
      :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
    >
      <template #text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="record.title" label="Title" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="record.author" label="Author" />
          </v-col>

          <v-col cols="12" md="6">
            <v-select v-model="record.genre" :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']" label="Genre" />
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input v-model="record.year" label="Year" :max="adapter.getYear(adapter.date())" :min="1" />
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input v-model="record.pages" label="Pages" :min="1" />
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false" />

        <v-spacer />

        <v-btn text="Save" @click="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { onMounted, ref, shallowRef } from 'vue'
  import { useDate } from 'vuetify'
  import axios from 'axios'

  const adapter = useDate()
  const apiUrl = 'http://localhost:3000/books'

  const DEFAULT_RECORD = { title: '', author: '', description: '', year: adapter.getYear(adapter.date()) }

  const books = ref([])
  const record = ref(DEFAULT_RECORD)
  const dialog = shallowRef(false)
  const isEditing = shallowRef(false)

  const headers = [
    { title: 'Title', key: 'title', align: 'start' },
    { title: 'Author', key: 'author' },
    { title: 'Description', key: 'description' },
    { title: 'Year', key: 'year', align: 'end' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]

  async function fetchBooks () {
    try {
      const response = await axios.get(apiUrl)
      books.value = response.data.books || []
      console.log(books.value)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  onMounted(() => {
    fetchBooks()
  })

  function add () {
    isEditing.value = false
    record.value = { ...DEFAULT_RECORD }
    dialog.value = true
  }

  function edit (id) {
    isEditing.value = true
    const found = books.value.find(book => book.id === id)
    record.value = { ...found }
    dialog.value = true
  }

  async function remove (id) {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      await fetchBooks()
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  async function save () {
    try {
      const { id, title, author, description, year } = record.value
      const dataToSend = { title, author, description, year }
      if (isEditing.value) dataToSend.id = id

      const method = isEditing.value ? 'put' : 'post'
      const url = isEditing.value ? `${apiUrl}/${id}` : apiUrl

      const response = await axios[method](url, dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.status >= 200 && response.status < 300) {
        await fetchBooks()
        dialog.value = false
        record.value = { ...DEFAULT_RECORD }
      }
    } catch (error) {
      console.error('Error saving book:', error)
    }
  }

  function reset () {
    fetchBooks()
  }
</script>
