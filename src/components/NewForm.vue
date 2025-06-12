<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field
      v-model="title"
      label="Book Title"
      required
    />
    <v-text-field
      v-model="author"
      label="Author"
      required
    />
    <v-textarea
      v-model="description"
      label="Description"
      required
    />
    <v-btn color="primary" type="submit">Add Book</v-btn>
  </v-form>
</template>

<script setup>
  import { ref } from 'vue'
  const title = ref('')
  const author = ref('')

  const description = ref('')
</script>
