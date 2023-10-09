import { HttpError } from '../helpers/HttpError.js';
import { Contact} from '../models/contact.js';

export const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, '-createdAt, -updatedAt', {skip, limit}).populate('owner', 'email subscription');
    res.status(200).json(result);
};

export const getById = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findOne({ _id: contactId });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
};

export const postContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
};

export const deleteContact = async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove({ _id: contactId });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json({
        message: 'Contact deleted'
    });
};

export const putContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
};

export const patchFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
};
