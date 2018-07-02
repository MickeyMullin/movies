const fs = require('fs')
const moment = require('moment')
// const movieArt = require('movie-art')
const imdb = require('node-movie')

const filesRaw = []
const files = []
const movies = []
const tabs = []

// const extensions = {}

/*
movies.push({
  dir,
  filename: stat.name,
  title: filename,
  extension,
  size: stat.size,
  modified: stat.mtime,
  accessed: stat.atime,
})
*/

movies.forEach(movie => {
  // movieArt(filename, { output: 'all' }).then(response => {
  //   console.log('%s, %o', filename, response)
  // })

  // TODO: split filename by expected format:
  //  name (year) aspect
  //  spit out non-conforming (aspect is optional)

  // TODO: indicate whether srt/sub file present

  const dateFormat = 'dd YYYY-MMM-DD HH:mm'

  tabs.push(dir
    + '\t' + filename
    + '\t' + moment(stat.mtime).format(dateFormat)
    + '\t' + moment(stat.atime).format(dateFormat))

  next()
})

walker.on('end', function() {
  // var extkeys = Object.keys(extensions)
  // extkeys.sort()
  // console.log(extkeys)
  const file = fs.createWriteStream('movies.txt')
  files.sort();
  files.forEach(v => {
    file.write(v + '\n')
  })

  const filet = fs.createWriteStream('movies-tab.txt')
  tabs.sort()
  tabs.unshift('dir\tfilename\tmodified\taccessed')

  tabs.forEach(v => {
    filet.write(v + '\n')
  })

  console.log(JSON.stringify(movies));

  console.log('done')
})
