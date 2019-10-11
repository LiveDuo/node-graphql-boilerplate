// import express from 'express'
import express from 'express'

import { logger } from './morgan'
import { parser, json } from './bodyParser'
import { locale } from '../../services/locale/i18n'
import { config } from '../../services/globals/config'

import { router as usersRouter } from '../../controllers/users/router'

import { notFound } from '../../controllers/errors/notFound'

const app = express()

const listen = () => app.listen(config.defaultPort, () => console.log(`Express listening on port ${config.defaultPort}!`))

app.use(logger)
app.use(locale)
app.use(parser)
app.use(json)

app.use('/users', usersRouter)

app.use(notFound)

export { listen, app }