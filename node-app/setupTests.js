import 'dotenv/config'

import { configure } from './services/locale/i18n'
import { connect } from './services/databases/mongoose'

configure()

connect()
