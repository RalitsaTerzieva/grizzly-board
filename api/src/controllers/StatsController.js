import model from '../models';
const { User, Board, Card } = model;

export default {
    async stats(req, res) {
        try {
            const userCount = await User.count();
            const boardCount = await Board.count();
            const cardCount = await Card.count();
            return res.status(200).send({ userCount, boardCount, cardCount });
        } catch (e) {
            console.log(e);
            return res.status(500)
                .send(
                    { message: 'Could not perform operation at this time, kindly try again later.' });
        }
    }
}