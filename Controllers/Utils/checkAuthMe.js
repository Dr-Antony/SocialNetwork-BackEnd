
import jwt from "jsonwebtoken";

const checkAuthMe = (req, res, next) => {
    // console.log(req.headers.authorization)
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            req.userId = decoded._id;
            next();
        } catch (error) {
            return res.status(403).json({
                message: 'Нет доступа!'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа!'
        })
    };
}


export default checkAuthMe;