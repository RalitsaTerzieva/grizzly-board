import model from '../models';
const { Board, Card } = model;
import { ValidationError } from '../utils/errors';

export default {
    async create(data) {
        this.validate(data)
        const board = await Board.create(data)
        return board
    },
    async update(board, data) {
        board.set(data);
        await board.save();

        for(let column of data.columns) {
            for (let [idx, card] of column.cards.entries()) {
                if (card.id) {
                    let cardObj = await Card.findByPk(card.id);
                    cardObj.set({...card, column_id: column.id, user_id: board.user_id, index: idx})
                    await cardObj.save();
                } else {
                    await Card.create({...card, column_id: column.id, user_id: board.user_id, index: idx});
                }
            }
        }
    },
    async delete(board) {
        board.destroy()
    },
    async deleteCard(card) {
        card.destroy()
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