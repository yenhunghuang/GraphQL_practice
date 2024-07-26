const { graphql } = require("graphql");
const Schema = require("./Schema");
const query = require("./queries/userQuery");

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
