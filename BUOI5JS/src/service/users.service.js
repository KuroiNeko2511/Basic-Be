import { readData, writeData } from "../repository/readData.js";

const parseUserId = (userId) => {
    const parsedId = Number(userId);

    // Nếu ID là chữ ('abc'), số âm (-1), số thập phân (1.5) -> Client gửi sai!
    if (!userId || isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
        throw new BadRequestError('User ID must be a valid positive integer'); // Trả về 400
    }

    return parsedId;
};

export const getAllUsers = async () => {
    const data = await readData();
    return data.users;
};

export const getUserById = async (userId) => {
    const id = parseUserId(userId);
    const data = await readData();
    const user = data.users.find((u) => u.id === id);

    if (!user) {
        throw new NotFoundError(`User with ID ${id} not found`);
    }

    return user;
};

export const createUser = async (userData) => {
    const data = await readData();
    data.users.push(userData);
    await writeData(data);
    return userData;
};

export const updateUser = async (userId, updateData) => {
    if (!updateData || Object.keys(updateData).length === 0) {
        throw new BadRequestError('Update payload cannot be empty');
    }

    const id = parseUserId(userId);
    const data = await readData();
    const index = data.users.findIndex((u) => u.id === id);

    if (index === -1) {
        throw new NotFoundError(`User with ID ${id} not found`);
    }

    // Merge changes and retain original user ID
    data.users[index] = { ...data.users[index], ...updateData, id };
    await writeData(data);
    return data.users[index];
};

export const deleteUser = async (userId) => {
    
    const id = parseUserId(userId);
    const data = await readData();
    const index = data.users.findIndex((u) => u.id === id);

    if (index === -1) throw new NotFoundError(`User with ID ${id} not found`);

    const [deletedUser] = data.users.splice(index, 1);
    await writeData(data);
    return deletedUser;
};