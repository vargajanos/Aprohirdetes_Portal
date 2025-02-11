import { addAdv, deleteAdv, getAdvById, getAllAdv, updateAdv } from "../services/AdvService";

export const addAdvertisement = async (req, res, next) => {
    try {
        const { userId, category, price, description, title, image } = req.body;
        //const image = req.file ? req.file.filename : null;  // Ha van fájl, akkor annak a neve lesz a 'image' mezőben

        if (!category || !price || !description || !userId || !title) {
            return res.status(400).json({ message: "Hiányzó adatok!" });
        }

        const newAdvertisement = await addAdv(userId, category, price, description, title, image);
        res.status(201).json(newAdvertisement);
    } catch (error) {
        next(error);
    }
};


export const getAll = async (req, res, next) => {
    try {
        res.status(200).json(await getAllAdv());
    } catch (error) {
        next(error);
    }
};

export const getAdvertisement = async (req, res, next) => {
    try {
        const product = await getAdvById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Termék nem található!" });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const updateAdvertisement = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updates = req.body;

        let product = await updateAdv(productId, updates)

        if (!product) {
            return res.status(404).json({ message: "Termék nem található!" });
        }

        res.status(200).json({ message: "Termék sikeresen frissítve!", product: product });
    } catch (error) {
        next(error);
    }
};

export const deleteAdvertisement = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await deleteAdv(productId)
        
        if (!product) {
            return res.status(404).json({ message: "Termék nem található!" });
        }

        res.status(200).json({ message: "Termék sikeresen törölve!" });
    } catch (error) {
        next(error);
    }
};
