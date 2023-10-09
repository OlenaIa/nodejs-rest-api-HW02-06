import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError.js';
import { User } from '../models/user.js';

export const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use')
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription}
    });
};

export const login = async (req, res) => {
   const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, 'Email or password is wrong')
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong');
    };

    const payload = {
        id: user._id,
    };
const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

    res.status(200).json({
        token,
        user: {
            email,
            subscription: user.subscription
        }
    })
}

