import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError.js';
import { User } from '../models/user.js';

const { SECRET_KEY } = process.env;
console.log('process.env =>', process.env);

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
    console.log(SECRET_KEY);
    // const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

    res.status(200).json({
        // token,
        user: {
            email,
            subscription: user.subscription
        }
    })
}

// export const deleteContact = async (req, res) => {
//     const { contactId } = req.params
//     const result = await Contact.findByIdAndRemove({ _id: contactId });
//     if (!result) {
//         throw HttpError(404, "Not found")
//     }
//     res.status(200).json({
//         message: 'Contact deleted'
//     });
// };

// export const putContact = async (req, res) => {
//     const { error } = putSchema.validate(req.body)
//     if (error) {
//         throw HttpError(400, error.message)
//     }
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
//     if (!result) {
//         throw HttpError(404, "Not found")
//     }
//     res.status(200).json(result);
// };

// export const patchFavorite = async (req, res) => {
//     const { error } = patchSchema.validate(req.body)
//     if (error) {
//         throw HttpError(400, error.message)
//     }
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
//     if (!result) {
//         throw HttpError(404, "Not found")
//     }
//     res.status(200).json(result);
// };
