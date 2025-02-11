import { AppDataSource } from "../config/data-source";
import { Advertisement } from "../entities/Advertisement";
import { User } from "../entities/User";

const productRepository = AppDataSource.getRepository(Advertisement);
 
export const addAdv = async (userId: string, category: string, price: number, description: string, title: string, image?: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) throw new Error("Felhasználó nem található!");

    const product = productRepository.create({ user, category, price, description, title, image });
    return await productRepository.save(product);
};

 
export const getAllAdv = async () => {
    return await productRepository.find({ select: ["id", "user", "category", "title", "description", "price", "date", "image"] });
};
 
export const getAdvById = async (id: string) => {
    return await productRepository.find({ where : {id}, select: ["id", "user", "category", "title", "description", "price", "date", "image"] });
};
 
export const updateAdv = async (id: string, updates: Partial<Advertisement>) => {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) return null;
    Object.assign(product, updates);
    return await productRepository.save(product);
};
 
export const deleteAdv = async (id: string) => {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) return null;
    await productRepository.remove(product);
    return true;
};