<template>
  <div class="breakdown">
    <b-btn variant="outline-primary" @click="toggleShow()" :pressed="showMovies">{{ breakdown }}</b-btn>

    <b-collapse :id="breakdown" v-model="showMovies">
      <b-card no-body>
        <b-card-header class="p-1" role="tab">
          <b-btn v-b-toggle="bdListId">List</b-btn>
          <b-btn v-b-toggle="bdCardsId">Cards</b-btn>
        </b-card-header>

        <b-collapse :id="bdListId" :accordion="accordionId" visible>
          <b-card-body>
            <ol>
              <li v-for="(movie, index) in movies" :key="index">{{ movie.title }}</li>
            </ol>
          </b-card-body>
        </b-collapse>
        <b-collapse :id="bdCardsId" :accordion="accordionId">
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
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    mMovie,
  },

  props: {
    breakdown: String,
    movies: Array,
  },

  data() {
    return {
      showMovies: false,
    }
  },

  computed: {
    accordionId() { return this.breakdown + '_accordion' },
    bdCardsId() { return this.breakdown + '_cards' },
    bdListId() { return this.breakdown + '_list' },

    ...mapState(['expandAll']),
  },

  methods: {
    toggleShow() {
      this.showMovies = !this.showMovies
      this.toggleAll(null)
    },
    ...mapMutations([
      'toggleAll',
    ])
  },

  watch: {
    expandAll(toggle) {
      if (typeof toggle === 'boolean') {
        this.showMovies = toggle
      }
    },
  },
}

</script>

<style lang="scss">

.breakdown {
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
