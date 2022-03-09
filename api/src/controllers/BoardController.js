import model from '../models';

const { Entry, User } = model;

import boardService from '../services/BoardService';
import { ValidationError } from '../utils/errors';


const boardFindOptions = {
    attributes: {
        exclude: ['user_id']
    },
    include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'email', 'first_name', 'last_name']
    }]
}

export default {
    async createBoard(req, res) {
        try {
            const entry = await boardService.create({...req.body, user_id: req.user._id})
            res.send(entry)
        } catch (e) {
            if (e instanceof ValidationError) {
                return res.status(403)
                .send(
                    { message: e.message });
            } else {
                console.log(e)
                return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
            }
        }
    },
    async updateBoard(req, res) {
        console.log(req.user)
        const entry = await Entry.findByPk(req.params.id)
        if (!entry) {
            return res.status(404).send({ message: 'Not found' });
        }
        try {
            await boardService.update(entry, req.body)
            res.send({ message: 'Successfully updated', id: req.params.id })
        } catch (e) {
            if (e instanceof ValidationError) {
                return res.status(403)
                .send(
                    { message: e.message });
            } else {
                return res.status(500)
                .send(
                    { error: 'Could not perform operation at this time, kindly try again later.' });
            }
        }
    },
    async deleteBoard(req, res) {
        const entry = await Entry.findByPk(req.params.id)
        if (!entry) {
            return res.status(404).send({ message: 'Not found' });
        }
        try {
            boardService.delete(entry)
            res.send({ message: 'Successfully deleted' })
        } catch (e) {
            console.log(e);
            return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
        }
    },
    async showBoard(req, res) {
        const entry = await Entry.findByPk(req.params.id, boardFindOptions);

        if (!entry) {
            return res.status(404).send({ message: 'Not found' });
        } else {
            return res.send(entry);
        }
    },
    async listBoard(req, res) {
        const allBoards = await Entry.findAll({where: {user_id: req.user._id}, order: [['date', 'DESC']], ...entryFindOptions});
        if (!allBoards) {
            return res.status(404).send({ message: 'Not found' });
        } else {
            return res.send(allBoards);
        }
    },
}