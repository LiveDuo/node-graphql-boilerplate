import { ApolloServer } from 'apollo-server'

import { getUser } from '../../controllers/users/getUser'

import { doAddUser } from '../../controllers/users/doAddUser'
import { doLoginUser } from '../../controllers/users/doLoginUser'
import { doUpdateUser } from '../../controllers/users/doUpdateUser'
import { doDeleteUser } from '../../controllers/users/doDeleteUser'

import { doTestUpload } from '../../controllers/test/doTestUpload'
import { doTestUploadResized } from '../../controllers/test/doTestUploadResized'

import { onUpdateUser } from '../../controllers/users/onUpdateUser'

import { typeDate } from '../../controllers/scalars/typeDate'

import { typeDefs } from './schema'

const resolvers = {
    Subscription: {
        onUpdateUser: onUpdateUser
    },
    Query: {
        getUser: getUser,
    },
    Mutation: {
        doAddUser: doAddUser,
        doUpdateUser: doUpdateUser,
        doLoginUser: doLoginUser,
        doDeleteUser: doDeleteUser,
        doTestUpload: doTestUpload,
        doTestUploadResized: doTestUploadResized,
    },
    Date: typeDate
}

const context = async ({ req, connection }) => {

    let authHeader = (connection) ? connection.context.token : req.headers.authorization
    return { authHeader }
}

const subscriptions = {
    onConnect: (connectionParams, webSocket) => {
        console.log('Websocket CONNECTED')

        return { token: connectionParams.token }
    },
    onDisconnect: () => {
        console.log('Websocket DISCONNECTED')
    },
}
const apolloServer = new ApolloServer({ typeDefs, resolvers, context, subscriptions})

const listen = async () => {
    let connection = await apolloServer.listen()
    console.log(`Apollo http running on ${connection.url}`)
    console.log(`Apollo web sockets running on ${connection.subscriptionsUrl}`)
}

export { listen }
