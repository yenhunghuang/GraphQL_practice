const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLScalarType,
    Kind,
    GraphQLNonNull,
    GraphQLInterfaceType,
} = require("graphql");

// Custom DateType scalar
const DateType = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

// DateTimeInterface
const DateTimeInterface = new GraphQLInterfaceType({
    name: "DateTimeInterface",
    fields: {
        createdAt: { type: DateType },
        updatedAt: { type: DateType },
    },
    resolveType(obj) {
        if (obj.email) return "User";
        // Add more conditions here for other types implementing this interface
        return null;
    },
});

const UserType = new GraphQLObjectType({
    interfaces: [DateTimeInterface],
    name: "User",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLString },
        friends: { type: new GraphQLList(GraphQLString) },
        createdAt: { type: DateType },
        updatedAt: { type: DateType },
    },
});

const user = {
    id: "1",
    email: "user@example.com",
    friends: ["Alice", "Bob"],
    createdAt: new Date(2023, 0, 1),
    updatedAt: new Date(),
};

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

const query = `
    query {
        user{
            id
            email
            friends
            createdAt
            updatedAt
        }
    }
`;

graphql({
    schema: Schema, // Use 'schema' instead of 'source' for the Schema
    source: query, // 'source' is for the query string
})
    .then((result) => {
        console.log("Result:", result);
        console.log("Friends:", result.data.user.friends);
        // console.log("Result:", JSON.stringify(result, null, 2));
    })
    .catch((error) => {
        console.error("Error:", error);
    });
