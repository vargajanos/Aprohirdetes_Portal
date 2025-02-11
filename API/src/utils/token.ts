var jwt = require('jsonwebtoken');
import { jwtSecret } from "../config/data-source";
 
export const generateToken = (payload: object): string => {
    return jwt.sign({data: payload}, jwtSecret, { expiresIn: "1h" });
};