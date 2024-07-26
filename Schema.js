const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const user = require("./data/sampleUser");
const UserType = require("./types/UserType");

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            user: {
                type: UserType,
                resolve: () => {
                    return { ...user, id: 2 };
                },
            },
        },
    }),
    // mutation: new GraphQLObjectType({}),
});

module.exports = Schema;
