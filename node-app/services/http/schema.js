import { gql } from 'apollo-server'

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
        isSync: Boolean
        image_urls: [String!]
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
        doUpdateUser (first_name: $first_name, last_name: $last_name, file: $file, isSync: $isSync) {
            first_name
            last_name
            image_urls
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
        doUpdateUser(first_name: String, last_name: String, file: Upload, isSync: Boolean): User
        doLoginUser(email: String!, password: String!): User
        doDeleteUser: Boolean
        doTestUpload(file: Upload!): FileUpload!
        doTestUploadResized(file: Upload!): FileUploadResized!
    }

    type Subscription {
        onUserUpdated: User
    }
`

export { typeDefs }