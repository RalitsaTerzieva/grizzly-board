import model from '../models';

const { Board, User, Column, Card } = model;

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
    }, {
        model: Column,
        as: 'columns',
        attributes: ['id', 'index', 'name'],
        include: [{
            model: Card,
            as: 'cards',
            attributes: ['id', 'title', 'index', 'description', 'comment'],
        }],
    }],
    order: [
        ['columns', 'index', 'asc'],
        ['columns', 'cards', 'index', 'asc'],
        ['id', 'asc']
    ],
}

export default {
    async createBoard(req, res) {
        try {
            const board = await boardService.create({...req.body, user_id: req.user._id})
            res.send(board)
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
        let board = await Board.findByPk(req.params.id)
        if (!board) {
            return res.status(404).send({ message: 'Not found' });
        }
        try {
            await boardService.update(board, req.body)
            board = await Board.findByPk(req.params.id, boardFindOptions)
            res.send({ message: 'Successfully updated', id: req.params.id, board: board })
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
        const board = await Board.findByPk(req.params.id)
        if (!board) {
            return res.status(404).send({ message: 'Not found' });
        }
        try {
            boardService.delete(board)
            res.send({ message: 'Successfully deleted' })
        } catch (e) {
            console.log(e);
            return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
        }
    },
    async showBoard(req, res) {
        const board = await Board.findByPk(req.params.id, boardFindOptions);

        if (!board) {
            return res.status(404).send({ message: 'Not found' });
        } else {
            return res.send(board);
        }
    },
    async listBoard(req, res) {
        const allBoards = await Board.findAll({where: {user_id: req.user._id}, order: [['start_date', 'DESC']], ...boardFindOptions});
        if (!allBoards) {
            return res.status(404).send({ message: 'Not found' });
        } else {
            return res.send(allBoards);
        }
    },
    async deleteCard(req, res) {
        const card = await Card.findByPk(req.params.id)
        if (!card) {
            return res.status(404).send({ message: 'Not found' });
        }
        try {
            boardService.deleteCard(card)
            res.send({ message: 'Successfully deleted' })
        } catch (e) {
            console.log(e);
            return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
        }
    },
}