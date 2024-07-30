const { buildSchema } = require("graphql");
const { getUser, updateUser } = require("./data/sampleUser");

const schema = buildSchema(`
  scalar Date

  type User {
    id: ID!
    email: String
    friends: [String]
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    user: User
  }

  type Mutation {
    updateUserEmail(email: String!): User
  }
`);

const root = {
    user: () => getUser(),
    updateUserEmail: ({ email }) => updateUser({ email }),
};

module.exports = { schema, root };
