const { GraphQLString, GraphQLNonNull } = require("graphql");
const UserType = require("../types/UserType");
const { user, updateUser } = require("../data/sampleUser");

//更新email
const UserMutation = {
    updateUserEmail: {
        type: UserType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parentValue, args) {
            return updateUser({ email: args.email });
        },
    },
};

module.exports = UserMutation;
