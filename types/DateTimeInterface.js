// DateTimeInterface
const { GraphQLInterfaceType } = require("graphql");
const DateType = require("./DateType");

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

module.exports = DateTimeInterface;
