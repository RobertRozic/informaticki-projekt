<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer />

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <v-container>
<!--        <v-row>{{categories}}</v-row>-->
        <v-row>
          <template v-for="category in categories" :key="category.list_id">
            <v-col
              class="mt-2"
              cols="12"
            >
              <strong> {{category.display_name}} </strong>
            </v-col>

            <v-col
              v-for="book in category.books"
              :key="book.primary_isbn13"
              cols="6"
              md="4"
            >
              <Book :book="book"></Book>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import axios from 'axios'
  import { ref, onMounted } from 'vue'

  const drawer = ref(null)
  const categories = ref([])

  const getData = async () => {
    const api = "https://api.nytimes.com/svc/books/v3/lists/overview.json"
    try {
      const response = await axios.get(api, {
        params: {
          'api-key': 'jGZL1u0s3GnGPUHbWdzefYCYQGDX0zus'
        }
      })
      categories.value = response.data.results.lists
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  onMounted(() => {
    getData()
  })
</script>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>
