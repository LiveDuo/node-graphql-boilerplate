import 'dotenv/config'

// import { listen  } from './services/http/express'
import { connect } from './services/databases/mongoose'
import { configure } from './services/locale/i18n'
import { listen } from './services/websockets/ws'

configure()

connect().then(listen)
