<template>
  <v-card
    class="mx-auto"
    hover
    max-width="344"
  >
    <v-card-item>
      <v-card-title class="wrap-title">
        {{ props.book.title }}
      </v-card-title>

      <v-card-subtitle>
        {{ props.book.author }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Open Dialog"
            variant="flat"
          >Description</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card :title="book.title">
            <v-card-text>
              {{ props.book.description }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { defineProps, ref } from 'vue'

  const props = defineProps({
    book: {
      type: Object,
      required: true,
    },
  })

  const dialog = ref(false)
</script>

<style scoped lang="sass">
.book
  background: #2980b9 !important
  color: white !important

.book-title
  overflow: hidden
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical

.wrap-title
  white-space: normal;
  word-break: break-word;

</style>
