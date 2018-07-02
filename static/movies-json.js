const fs = require('fs')
const walk = require('walk')

const walker  = walk.walk('movies', { followLinks: false })
const movies = []
let priorDir = 'movies'

const ignored = [
  'idx',
  'jpg',
  'srt',
  'sub',
  'txt'
]

// const extensions = {}

/*
Stats {
  dev: 18,
  mode: 33279,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 281474976711899,
  size: 1075842867,
  blocks: 2101256,
  atimeMs: 1426390230852.3357,
  mtimeMs: 1297542996000,
  ctimeMs: 1497056881727.2542,
  birthtimeMs: 1497056881727.2542,
  atime: 2015-03-15T03:30:30.852Z, // accessed
  mtime: 2011-02-12T20:36:36.000Z, // modified
  ctime: 2017-06-10T01:08:01.727Z, // modified/changed (contents or attributes)
  birthtime: 2017-06-10T01:08:01.727Z,
  name: 'The 40 Year Old Virgin.m4v',
  type: 'file' }
*/

walker.on('file', (root, stat, next) => {
  const dir = root.replace('movies/', '')
  const prefix = dir + '/'

  let extension = stat.name.match(/\.([^\.]+)$/)
  if (extension) {
    extension = extension[1].toLowerCase()
  } else {
    extension = ''
  }
  if (ignored.includes(extension)) { next(); return }
  // extensions[extension] = true

  const filename = stat.name.replace(/\.[^\.]+$/, '')

  movies.push({
    dir,
    filename: stat.name,
    title: filename,
    extension,
    size: stat.size,
    modified: stat.mtime,
    accessed: stat.atime,
  })
  
  next()
})

walker.on('end', function() {
  // var extkeys = Object.keys(extensions)
  // extkeys.sort()
  // console.log(extkeys)

  // sort by dir then by name
  // TODO: title sort (ignore leading "a" and "the," etc.)
  movies.sort((a, b) => {
    var comp = compare(a.dir, b.dir)
    if (!comp) return compare(a.filename, b.filename)
    return comp
  })

  const file = fs.createWriteStream('movies.json')

  file.write(JSON.stringify(movies, null, '  '))

  console.log('done; processed %d movies', movies.length)
})

function compare(a, b) {
  a = a.toUpperCase()
  b = b.toUpperCase()
  if (a < b) return -1
  if (a > b) return 1
  return 0
}
