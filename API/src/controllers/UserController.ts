import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { deleteUser, getAllUsers, getUserById, loginUser, registerUser, updateUser } from "../services/UserService";

export const register = async (req, res, next) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name || !email || !password || address) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }
        res.status(201).json(await registerUser(name, email, password, address));
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }

        res.status(200).json(await loginUser(email, password));
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        res.status(200).json(await getAllUsers());
    } catch (error) {
        next(error);
    }
};

export const getU = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getLoggedUserProfile = async (req, res, next) => {
    try {
        const userRepository = await AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: req.user.data.id });
        if (!user) {
            console.log("Fasz4234")
            return res.status(404).json({message: "Felhasználó nem található!"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

export const updateU = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        let user = await updateUser(userId, updates)

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        res.status(200).json({ message: "Felhasználó sikeresen frissítve!", user: user });
    } catch (error) {
        next(error);
    }
};

export const deleteU = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await deleteUser(userId)
        
        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található!" });
        }

        res.status(200).json({ message: "Felhasználó sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};
