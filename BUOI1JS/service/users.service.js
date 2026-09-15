import { readData } from "../repository/readData.js";

export const getAllUsers = async () => {
  try {
    const data = await readData();
    return data.users;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const getUserById = async (userId) => {
  try {
    const data = await readData();

    const user = data.users.find(user => user.id === parseInt(userId));
    return user || null;
  }
  catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
}

// CREATE
export const createUser = async (userData) => {
  try {
    const data = await readData();
    
    // Tạo ID mới tự động
    const newUser = {
      id: Date.now(),
      ...userData
    };

    data.users.push(newUser);
    await writeData(data);
    
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// UPDATE
export const updateUser = async (userId, updateData) => {
  try {
    const data = await readData();
    const index = data.users.findIndex(u => u.id === parseInt(userId));

    if (index === -1) return null;

    // Giữ nguyên ID, ghi đè các trường thông tin mới
    const updatedUser = {
      ...data.users[index],
      ...updateData,
      id: parseInt(userId)
    };

    data.users[index] = updatedUser;
    await writeData(data);

    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// DELETE
export const deleteUser = async (userId) => {
  try {
    const data = await readData();
    const initialLength = data.users.length;
    
    data.users = data.users.filter(u => u.id !== parseInt(userId));

    if (data.users.length === initialLength) {
      return false; // Không tìm thấy user để xóa
    }

    await writeData(data);
    return true;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};