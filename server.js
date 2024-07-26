const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            user: {
                type: new GraphQLObjectType({
                    name: "User",
                    fields: {
                        id: { type: GraphQLID },
                        email: {
                            type: GraphQLString,
                        },
                    },
                }),
            },
        },
    }),
    // mutation: new GraphQLObjectType({}),
});

const query = `
    query {
        user{
        id,
        email
        }
    }
`;

graphql({
    schema: Schema, // Use 'schema' instead of 'source' for the Schema
    source: query, // 'source' is for the query string
})
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
