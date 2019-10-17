import { GooglePubSub } from '@axelspringer/graphql-google-pubsub'

const options = {
    projectId: process.env.GOOGLE_PUBSUB_PROJECT_ID,
    credentials: {
        client_email: process.env.GOOGLE_PUBSUB_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PUBSUB_PRIVATE_KEY
    }
}
const topic2SubName = (topicName) => `${topicName}-subscription`
const commonMessageHandler = ({attributes = {}, data = ''}) => JSON.parse(data.toString())

const pubsub = new GooglePubSub(options, topic2SubName, commonMessageHandler)

export { pubsub }