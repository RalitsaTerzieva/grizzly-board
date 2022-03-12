import model from '../models';
const { Board } = model;
import { ValidationError } from '../utils/errors';

export default {
    async create(data) {
        this.validate(data)
        const board = await Board.create(data)
        return board
    },
    async update(board, data) {
        this.validate(data);
        board.set(data);
        await board.save();
    },
    async delete(board) {
        board.destroy()
    },
    validate(data) {
        if (!!!data.name) {
            throw new ValidationError("Please enter a valid name");
        }
        if (!!!data.start_date) {
            throw new ValidationError("Please enter a valid start date");
        }
        if (!!!data.end_date) {
            throw new ValidationError("Please enter a valid end date");
        }
        if (!!!data.description) {
            throw new ValidationError("Please enter a valid description");
        }
    },
}