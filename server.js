const { ApolloServer, gql } = require("apollo-server");
const { getUser, updateUser } = require("./data/sampleUser");

// 定義 schema
const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        name: String
        email: String
        friends: [String]
        createdAt: Date
        updatedAt: Date
    }

    type Query {
        user: User
    }

    input UserInputType {
        id: ID!
        name: String
    }

    type UserPayloadType {
        user: User
        message: String
        error: [String]
        status: Int
    }

    type Mutation {
        updateUser(input: UserInputType): UserPayloadType
    }
`;

// 定義 resolvers
const resolvers = {
    Query: {
        user: () => getUser(),
    },
    Mutation: {
        updateUser: (_, { input }) => {
            try {
                const user = updateUser(input);
                return {
                    user,
                    message: "User updated successfully",
                    error: [],
                    status: 200,
                };
            } catch (error) {
                return {
                    user: null,
                    message: "User updated failed",
                    error: [error.message],
                    status: 400,
                };
            }
        },
    },
    User: {
        email: (parent, args, context, info) => {
            console.log("Parent in email resolver:", parent);
            return parent.email;
        },
    },
};

// 創建 Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// 啟動服務器
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
