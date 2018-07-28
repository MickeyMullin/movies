<template>
  <section class="container">
    <div>
      <h1 class="title">
        movies
      </h1>
      <h2 class="subtitle">
        Movie Library
      </h2>

      <b-btn variant="outline-secondary" @click="toggleAll(!expandAll)" :pressed="expandAll">{{ expandAll ? 'Collapse' : 'Expand' }} all</b-btn>

      <m-dir v-for="(movies, key) in directories" :key="key"
        :dir="key"
        :movies="movies"
      ></m-dir>
    </div>
  </section>
</template>

<script>

import mDir from '~/components/directory.vue'
import movieData from '~/static/movies.json'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    mDir,
  },

  data() {
    return {
      directories: Array,
      movies: Array,
    }
  },

  computed: {
    ...mapState(['expandAll']),
  },

  methods: {
    async getMovies() {
      this.movies = movieData
      this.directories = {}
      movieData.forEach(movie => {
        if (!(movie.dir in this.directories)) { this.directories[movie.dir] = [] }
        this.directories[movie.dir].push(movie)
      })
    },
    ...mapMutations([
      'toggleAll',
    ]),
  },

  created() {
    this.getMovies()
  },
}
</script>

<style lang="scss">

.container {
  min-height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
