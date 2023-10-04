import { body } from "express-validator";
import { validationResult } from "express-validator";


export const registerValidation = [
    body('email', 'Неверный формат почты.').isEmail(),
    body('password', 'Длина пароля должна быть равна или больше пяти символов.').isLength({ min: 5 }),
    body('userName', 'Длина имени не божет быть меньше трёх символов.').isLength({ min: 3 }),
    body('avatarUrl', 'Неверный формат ссылки на аватар.').optional().isURL()
];



export const handleValidationErrors =  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    };
    next();
};