import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
const bcrypt = require('bcrypt');
import { generateToken } from "../utils/token";
 
const userRepository = AppDataSource.getRepository(User);
 
export const registerUser = async (name: string, email: string, password: string, address: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, address, password: hashedPassword });
    return await userRepository.save(user);
};
 
export const loginUser = async (email: string, password: string) => {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new Error("Nem regisztrált felhasználó!");
    if (!await bcrypt.compare(password, user.password)) throw new Error("Hibás jelszó!");
    const token = generateToken({ id: user.id, name: user.name, email: user.email });
    return { token };
};
 
export const getAllUsers = async () => {
    return await userRepository.find({ select: ["id", "name", "email", "address"] });
};
 
export const getUserById = async (id: string) => {
    return await userRepository.findOne({ where: { id }, select: ["id", "name", "email", "address"] });
};
 
export const updateUser = async (id: string, updates: Partial<User>) => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) return null;
    Object.assign(user, updates);
    return await userRepository.save(user);
};
 
export const deleteUser = async (id: string) => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) return null;
    await userRepository.remove(user);
    return true;
};