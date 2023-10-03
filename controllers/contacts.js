import { HttpError } from '../helpers/HttpError.js';
import { Contact, addSchema, patchSchema, putSchema } from '../models/contact.js';

export const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find();
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await Contact.findOne({ _id: contactId });
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

export const postContact = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const result = await Contact.create(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await Contact.findByIdAndRemove({ _id: contactId });
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json({
            message: 'Contact deleted'
        })
    } catch (error) {
        next(error);
    }
};

export const putContact = async (req, res, next) => {
    try {
        const { error } = putSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

export const patchFavorite = async (req, res, next) => {
    try {
        const { error } = patchSchema.validate(req.body)
        if (error) {
            throw HttpError(400, error.message)
        }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
        if (!result) {
            throw HttpError(404, "Not found")
        }
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};
