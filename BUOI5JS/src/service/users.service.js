import { readData, writeData } from "../repository/readData.js";

export const getAllUsers = async () => {
    const data = await readData();
    return data.users;
};

export const getUserById = async (userId) => {
    const data = await readData();
    return data.users.find((user) => user.id === parseInt(userId)) || null;
};

export const createUser = async (userData) => {
    const data = await readData();
    data.users.push(userData);
    await writeData(data);
    return userData;
};

export const updateUser = async (userId, updateData) => {
    const data = await readData();
    const index = data.users.findIndex((user) => user.id === parseInt(userId));

    if (index === -1) return null;

    data.users[index] = { ...data.users[index], ...updateData };
    await writeData(data);
    return data.users[index];
};

export const deleteUser = async (userId) => {
    const data = await readData();
    const index = data.users.findIndex((user) => user.id === parseInt(userId));

    if (index === -1) return null;

    const [deletedUser] = data.users.splice(index, 1);
    await writeData(data);
    return deletedUser;
};