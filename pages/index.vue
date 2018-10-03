<template>
  <section class="container">
    <div>
      <h1 class="title">
        movies
      </h1>
      <h2 class="subtitle">
        Movie Library
      </h2>

      <div>
        <b-btn @click="view = 'alpha'" :pressed="alphaView">Alpha</b-btn>
        <b-btn @click="view = 'modified'" :pressed="modifiedView">Downloaded</b-btn>
      </div>

      <b-btn variant="outline-secondary" @click="toggleAll(!expandAll)" :pressed="expandAll">{{ expandAll ? 'Collapse' : 'Expand' }} all</b-btn>

      <div v-show="alphaView">
        <h3>Alpha</h3>
        <m-dir v-for="(movies, key) in directories" :key="key"
          :dir="key"
          :movies="movies"
        ></m-dir>
      </div>

      <div v-show="modifiedView">
        <h3>Downloaded</h3>
        <m-bd v-for="key in modifiedMonths" :key="key"
          :breakdown="key"
          :movies="modifieds[key]"
        ></m-bd>
      </div>
    </div>
  </section>
</template>

<script>

import mBd from '~/components/breakdown.vue'
import mDir from '~/components/directory.vue'
import movieData from '~/static/movies.json'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    mBd,
    mDir,
  },

  data() {
    return {
      directories: Array,
      modifieds: Array,
      modifiedMonths: Array,
      movies: Array,
      view: 'alpha',
    }
  },

  computed: {
    alphaView() {
      return this.view == 'alpha'
    },
    modifiedView() {
      return this.view == 'modified'
    },
    ...mapState(['expandAll']),
  },

  methods: {
    async getDirectories() {
      this.directories = {}
      movieData.forEach(movie => {
        if (!(movie.dir in this.directories)) { this.directories[movie.dir] = [] }
        this.directories[movie.dir].push(movie)
      })
    },
    async getModifieds() {
      this.modifieds = {}
      movieData.forEach(movie => {
        const date = new Date(movie.modified)

        // const year = date.getFullYear()
        // const month = date.getMonth()
        // const day = date.getDate()
        // if (!(year in this.modifieds)) { this.modifieds[year] = {} }
        // if (!(month in this.modifieds[year])) { this.modifieds[year][month] = {} }
        // if (!(day in this.modifieds[year][month])) { this.modifieds[year][month][day] = [] }
        // this.modifieds[year][month][day].push(movie)

        const yearmonth = date.getFullYear() + '-' + zeroPad(date.getMonth() + 1)
        if (!(yearmonth in this.modifieds)) { this.modifieds[yearmonth] = [] }
        this.modifieds[yearmonth].push(movie)
      })
      let modMonths = Object.keys(this.modifieds)
      modMonths.sort()
      // modMonths.forEach(ym => {
      //   const year = ym.substring(0, 4)
      //   const month = ym.substring(5)
      //   if (!(ym in this.modifiedMonths)) { this.modifiedMonths}
      // })
      this.modifiedMonths = modMonths
    },
    /* async */ getMovies() {
      this.movies = movieData
      // this.directories = {}
      // movieData.forEach(movie => {
      //   if (!(movie.dir in this.directories)) { this.directories[movie.dir] = [] }
      //   this.directories[movie.dir].push(movie)
      // })
    },
    ...mapMutations([
      'toggleAll',
    ]),
  },

  created() {
    this.getMovies()
    this.getDirectories()
    this.getModifieds()
  },
}

function zeroPad(num, len) {
  if (!len) len = 2

  let numstr = num + ''
  while (numstr.length < len) {
    numstr = '0' + numstr
  }
  return numstr
}
</script>

<style lang="scss">

.hidden {
  display: none;
}

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
