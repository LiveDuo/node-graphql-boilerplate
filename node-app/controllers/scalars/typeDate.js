const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const typeDate = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        // parseValue: gets invoked to parse client input that was passed through variables.
        return new Date(value);
    },
    serialize(value) {
        // serialize: gets invoked when serializing the result to send it back to a client.
        return new Date(value)
    },
    parseLiteral(ast) {
        // parseLiteral: gets invoked to parse client input that was passed inline in the query.
        if (ast.kind === Kind.INT) {
            return new Date(ast.value)
        }
        return null;
    },
})

exports.typeDate = typeDate