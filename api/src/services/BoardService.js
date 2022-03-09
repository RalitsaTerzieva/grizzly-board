import model from '../models';
const { Entry } = model;
import { ValidationError } from '../utils/errors';

export default {
    async create(data) {
        this.validate(data)
        const board = await Entry.create(data)
        return board
    },
    async update(board, data) {
        this.validate(data);
        board.set(data);
        await board.save();
    },
    async delete(entry) {
        board.destroy()
    },
    validate(data) {
        if (!!!data.date) {
            throw new ValidationError("Please enter a valid date");
        }
        if (!!!data.description) {
            throw new ValidationError("Please enter a valid description");
        }
    }
}