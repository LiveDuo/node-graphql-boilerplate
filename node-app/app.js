import 'dotenv/config'

import { connect } from './services/databases/mongoose'
import { configure } from './services/locale/i18n'
import { listen } from './services/http/apollo'

configure()

connect().then(listen)
