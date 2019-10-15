import { ApolloServer, gql } from 'apollo-server'

import { getUser } from '../../controllers/users/getUser'

import { doAddUser } from '../../controllers/users/doAddUser'
import { doLoginUser } from '../../controllers/users/doLoginUser'
import { doUpdateUser } from '../../controllers/users/doUpdateUser'
import { doDeleteUser } from '../../controllers/users/doDeleteUser'

import { doTestUpload } from '../../controllers/test/doTestUpload'
import { doTestUploadResized } from '../../controllers/test/doTestUploadResized'

// import { onUserUpdated } from '../../controllers/users/onUserUpdated'

import { typeDate } from '../../controllers/scalars/typeDate'

const typeDefs = gql`
    scalar Date

    type FileUpload {
        url: String!
    }

    type FileUploadResized {
        urls: [String!]!
    }

    type User {
        id: String
        first_name: String
        last_name: String
        email: String
        jwt: String
    }

    type Query {
        getUser(id: String!): User
    }

    mutation doAddUser {
        doAddUser (first_name: $first_name, last_name: $last_name, email: $email, password: $password) {
            first_name
            last_name
            email
            jwt
        }
    }

    mutation doDeleteUser {
        doDeleteUser
    }

    mutation doUpdateUser {
        doUpdateUser (first_name: $first_name, last_name: $last_name) {
            first_name
            last_name
            email
        }
    }

    mutation doLoginUser {
        doLoginUser (email: $email, password: $password) {
            first_name
            last_name
            email
            jwt
        }
    }

    type Mutation {
        doAddUser(first_name: String!, last_name: String!, email: String!, password: String!): User
        doUpdateUser(first_name: String, last_name: String): User
        doLoginUser(email: String!, password: String!): User
        doDeleteUser: Boolean
        doTestUpload(file: Upload!): FileUpload!
        doTestUploadResized(file: Upload!): FileUploadResized!
    }

    type Subscription {
        onUserUpdated: User
    }
`

const resolvers = {
    Subscription: {
        // onUserUpdated: onUserUpdated
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
        // console.log('Websocket CONNECTED')

        return { token: connectionParams.token }
    },
    onDisconnect: () => {
        // console.log('Websocket CONNECTED')
    },
}
const apolloServer = new ApolloServer({ typeDefs, resolvers, context, subscriptions})

const listen = async () => {
    let connection = await apolloServer.listen()
    console.log(`Apollo http running on ${connection.url}`)
    console.log(`Apollo web sockets running on ${connection.subscriptionsUrl}`)
}

export { listen }
