const { graphql } = require("graphql");
const Schema = require("./Schema");

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

graphql({
    schema: Schema, // Use 'schema' instead of 'source' for the Schema
    source: query, // 'source' is for the query string
})
    .then((result) => {
        console.log("Result:", result);
        //console.log("Result:", JSON.stringify(result, null, 2));
        if (result.data && result.data.user) {
            console.log("Friends:", result.data.user.friends);
            // console.log("Result:", JSON.stringify(result, null, 2));
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// 執行 mutation
graphql({
    schema: Schema,
    source: mutation, //source for "mutation" to update email
})
    .then((result) => {
        console.log("Mutation Result:", result);
        //console.log("Mutation Result:", JSON.stringify(result, null, 2));
    })
    .catch((error) => {
        console.error("Mutation Error:", error);
    });
