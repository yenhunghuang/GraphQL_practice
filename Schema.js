const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { getUser } = require("./data/sampleUser");
const UserType = require("./types/UserType");
const UserMutation = require("./mutations/userMutation.js");

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            user: {
                type: UserType,
                resolve: () => {
                    return getUser();
                },
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            updateUserEmail: UserMutation.updateUserEmail,
        },
    }),
});

module.exports = Schema;
