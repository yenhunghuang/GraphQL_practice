const { graphql } = require("graphql");
const { schema, root } = require("./schema_");

const query = `
  query {
    user {
      id
      email
      friends
      createdAt
      updatedAt
    }
  }
`;

const mutation = `
  mutation {
    updateUserEmail(email: "newemail@example.com") {
      id
      email
      updatedAt
    }
  }
`;

graphql({ schema, source: query, rootValue: root })
    .then((result) => {
        console.log("Query Result:", JSON.stringify(result, null, 2));
    })
    .catch((error) => {
        console.error("Query Error:", error);
    });

graphql({ schema, source: mutation, rootValue: root })
    .then((result) => {
        console.log("Mutation Result:", JSON.stringify(result, null, 2));
    })
    .catch((error) => {
        console.error("Mutation Error:", error);
    });
