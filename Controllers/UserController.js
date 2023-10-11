import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../Models/User.js";

/////////////////////////////////////////////////////////////////////////
export const registration = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const doc = UserModel({
            email: req.body.email,
            passwordHash: hash,
            userName: req.body.userName,
            avatarUrl: req.body.avatarUrl,
            phone: req.body.phone,
            address: req.body.address,
            profession: req.body.profession,
            website: req.body.website,
            github: req.body.github,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            facebook: req.body.facebook
        });
        const user = await doc.save();
        const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });
        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error)
        if (error.keyPattern.email) {
            return res.status(501).send([{
                msg: "Не удалось зарегистрироваться! Пользователь с такой почтой уже существует!",
            }])
        }
        res.status(501).send([{
            msg: "Не удалось зарегистрироваться!",
        }])
    }
}


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).send([{ msg: 'Пользователь с такой почтой не зарегистрирован!' }])
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPassword) {
            console.log('Пароль неверный !')
            return res.status(367).json({
                message: "Неверный пароль"
            })
        }
        if (user && isValidPassword) {
            console.log(`Авторизация прошла успешно, ${user._doc.userName}!`);
            const token = jwt.sign({
                _id: user._id
            }, 'secret123', {
                expiresIn: '30d'
            });
            const { passwordHash, ...userData } = user._doc;
            res.json({
                ...userData,
                token
            });
        }

    } catch (error) {
        console.log(error)

        if (error.keyPattern ? error.keyPattern.email : null) {
            return res.status(501).send([{
                msg: "Не удалось Авторизоваться! Пользователя с такой почтой нет!",
            }])
        }
        return res.status(501).send([{
            msg: "Не удалось автоизоватья!"
        }])
    }
};

export const authMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        const { passwordHash, ...userData } = user._doc;
        return res.json(userData);
    } catch (error) {
        console.log(error)
    }
}

export const updateData = async (req, res) => {
    try {
        console.log(req.userId)
        console.log(req.params.id)
        if (req.userId === req.params.id) {
            await UserModel.updateOne(
                {
                    _id: req.params.id
                },
                {
                    email: req.body.email,
                    userName: req.body.userName,
                    avatarUrl: req.body.avatarUrl,
                    phone: req.body.phone,
                    address: req.body.address,
                    profession: req.body.profession,
                    website: req.body.website,
                    github: req.body.github,
                    twitter: req.body.twitter,
                    instagram: req.body.instagram,
                    facebook: req.body.facebook
                })
        }
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(409).json({
            message: 'Не удалось обновить данный!'
        })
    }
}

///////////////////////////////////////////////////////////////


export const getAllUsers = async (req,res)=> {
    try {
        const users = await UserModel.find();
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false
        })
    }
}