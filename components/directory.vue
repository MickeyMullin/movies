<template>
  <div class="directory">
    <b-btn variant="outline-primary" @click="showMovies = !showMovies" :pressed="showMovies">{{ dir }}</b-btn>

    <b-collapse :id="dir" v-model="showMovies">
      <b-card no-body>
        <b-card-header class="p-1" role="tab">
          <b-btn v-b-toggle="dirListId">List</b-btn>
        </b-card-header>

        <b-collapse :id="dirListId" :accordion="accordionId" visible>
          <b-card-body>
            <ol>
              <li v-for="(movie, index) in movies" :key="index">{{ movie.title }}</li>
            </ol>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body>
        <b-card-header class="p-1" role="tab">
          <b-btn v-b-toggle="dirCardsId">Cards</b-btn>
        </b-card-header>

        <b-collapse :id="dirCardsId" :accordion="accordionId">
          <m-movie
            v-for="(movie, index) in movies"
            :key="index"
            :movie="movie"
          ></m-movie>
        </b-collapse>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>

import mMovie from '~/components/movie.vue'

export default {
  components: {
    mMovie,
  },

  props: {
    dir: String,
    movies: Array,
  },

  data() {
    return {
      showMovies: false,
    }
  },

  computed: {
    accordionId() { return this.dir + '_accordion' },
    dirCardsId() { return this.dir + '_cards' },
    dirListId() { return this.dir + '_list' },
  },
}

</script>

<style lang="scss">

.directory {
  &::after {
    content: '';
    clear: left;
    display: block;
  }
  .movie {
    float: left;
  }
}

</style>
