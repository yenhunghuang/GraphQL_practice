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

module.exports = query;
