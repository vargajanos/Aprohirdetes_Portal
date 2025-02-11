import { AppDataSource, jwtSecret } from "../config/data-source";
import { User } from "../entities/User";

const jwt = require('jsonwebtoken');
 
export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
 
    if (!token){
        return res.status(400).json({
            success: false,
            message: 'Hozzáférés megtagadva! Hiányzó token!'
        });
    }
 
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
 
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: decoded.userId } });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Felhasználó nem található!'
            });
        }
 
        req.userDetails = user;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Érvénytelen vagy lejárt token!'
        });
    }
};