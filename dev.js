import { pipe } from './utils/fn.js'
import { startServer } from './utils/server.js'
import { watchChanges } from './utils/watch.js'

pipe(
  startServer(),
  watchChanges()
)