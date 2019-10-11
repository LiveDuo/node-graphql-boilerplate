import bodyParser from 'body-parser'

export const parser = bodyParser.urlencoded({ extended: true })
export const json = bodyParser.json()
