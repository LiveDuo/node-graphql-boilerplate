import http from 'http'
import WebSocket from 'ws'

import { app } from '../http/express'

import { config } from '../../services/globals/config'

const server = http.createServer()
server.on('request', app)

const wss = new WebSocket.Server({ server })

const onMessage = (ws, message) => {
  console.log(`received: ${message}`)
  ws.send(`received: ${message}`)
}
const onConnection = (ws) => {
  ws.on('message', message => onMessage(ws, message))
  ws.send('connection established')

  // setInterval(() => ws.send('trigger'), 3000)
}

const onClose = () => {
  console.log('disconnected')
}

wss.on('connection', onConnection)

wss.on('close', onClose)

const listen = () => server.listen(config.defaultPort, () => console.log(`Express with websockets listening on port ${server.address().port}`))

export { listen }