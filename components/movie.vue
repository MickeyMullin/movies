<template>
  <!-- <div class="movie"> -->
    <b-card
      class="movie"
      :title="title"
    >
    <ul>
      <li>Size: {{ movie.size }}</li>
      <li>Modified: {{ movie.modified }}</li>
      <li>Accessed: {{ movie.accessed }}</li>
    </ul>
    </b-card>
  <!-- </div> -->
</template>

<script>

export default {
  props: {
    movie: Object,
  },

  computed: {
    title() { return this.movie.title },
  },
}

</script>
