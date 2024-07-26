const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");
const DateTimeInterface = require("./DateTimeInterface");
const DateType = require("./DateType");

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

module.exports = UserType;
