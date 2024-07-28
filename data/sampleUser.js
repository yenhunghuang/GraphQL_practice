let user = {
    id: "1",
    email: "user@example.com",
    friends: ["Alice", "Bob"],
    createdAt: new Date(2023, 0, 1),
    updatedAt: new Date(),
};

module.exports = {
    getUser: () => user,
    updateUser: (newData) => {
        user = { ...user, ...newData, updatedAt: new Date() };
        return user;
    },
};
